  export async function mockTimeResolve(time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Swap");
      },  1000 * time);
    });
  }