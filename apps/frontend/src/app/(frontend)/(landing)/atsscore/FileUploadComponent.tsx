"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PDFParse } from "pdf-parse";
import { useRouter } from "next/navigation";
import mammoth from "mammoth";

const FileUploadComponent = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const parsePDF = useCallback(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      // Parsed text not used, just store file
      handleFileChange(file);
      router.push("/atsscore/results");
    } catch (error) {
      console.error("Error parsing PDF:", error);
    } finally {
      await parser.destroy();
    }
  }, [router]);

  const parseDOCX = useCallback(async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      handleFileChange(file);
      router.push("/atsscore/results");
    } catch (error) {
      console.error("Error parsing DOCX:", error);
    }
  }, [router]);

  const parseTextFile = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      handleFileChange(file);
      router.push("/atsscore/results");
    } catch (error) {
      console.error("Error parsing text file:", error);
    }
  }, [router]);

const handleFileChange = (selectedFile: File | null) => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem("uploadedFile", reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }
};

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        if (file.type === "application/pdf") {
          parsePDF(file);
        } else if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          parseDOCX(file);
        } else if (
          file.type === "text/plain" ||
          file.type === "text/html" ||
          file.type === "application/rtf"
        ) {
          parseTextFile(file);
        } else if (file.type.startsWith("image/")) {
          // For images, just store and redirect without parsing
          const fileUrl = URL.createObjectURL(file);
          localStorage.setItem(
            "uploadedFile",
            JSON.stringify({
              fileUrl,
              fileType: file.type,
              parsedText: "",
              analysis: "Image uploaded successfully.",
            })
          );
          router.push("/atsscore/results");
        }
      }
    },
    [router, parsePDF, parseDOCX, parseTextFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/html": [".html"],
      "application/rtf": [".rtf"],
      "text/plain": [".txt"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  return (
    <div className="my-5">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 pb-0 text-center cursor-pointer transition-colors bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20 ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        } hover:border-gray-400`}
      >
        <input {...getInputProps()} />
        <div className="text-gray-600">
          <p className="text-lg font-semibold text-sm text-white absolute top-2 left-2">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </p>
          <p className="text-sm text-white absolute top-2 right-2">
            Check Your Score
          </p>
          <p className="text-base my-5 text-white">
            {isDragActive
              ? "Drop the file here..."
              : "Drop to upload your resume or choose a file."}
          </p>
          <p className="text-sm text-gray-300">
            We can read: DOC, DOCX, PDF, HTML, RTF, TXT, Images
          </p>
          <p className="text-sm text-gray-300 mt-1">Max 5MB file size.</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadComponent;
