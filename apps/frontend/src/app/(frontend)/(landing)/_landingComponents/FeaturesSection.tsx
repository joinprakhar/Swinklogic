import {
  Shield,
  TrendingUp,
  UserPlus,
  Monitor,
  Heart,
  Target,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "ATS Resume Checker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      icon: TrendingUp,
      title: "Instant Job Alerts",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      icon: UserPlus,
      title: "Resume Builder",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      icon: Monitor,
      title: "AI Interview Prep",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      icon: Heart,
      title: "Application Tracker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
    {
      icon: Target,
      title: "Result",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.",
    },
  ];

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative text-white">
      <div className="grid grid-cols-1 gap-8 m-5 text-center text-white sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 ">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="p-3 lg:p-[2rem] scale-105 bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20 transition-all duration-300"
            >
              <div className="relative">
                <IconComponent className="mx-auto w-12 h-12 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300" />
              </div>
              <h3 className="mt-3 text-xl font-bold font-pj text-green-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="mt-5 text-base font-pj text-white transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
