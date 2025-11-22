// apps/worker/src/semaphore.ts
export class Semaphore {
  private tasks: (() => void)[] = [];
  private current = 0;
  constructor(private limit: number) {}
  async acquire() {
    if (this.current < this.limit) {
      this.current++;
      return;
    }
    await new Promise<void>((resolve) => this.tasks.push(resolve));
    this.current++;
  }
  release() {
    this.current--;
    const next = this.tasks.shift();
    if (next) next();
  }
}
