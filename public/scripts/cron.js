async function doWork() {
    const start = Date.now();

    // Simulate async work (replace with your real async code)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
    console.log('Work done at', new Date());

    const elapsed = Date.now() - start;
    const delay = Math.max(1000 - elapsed, 0);

    setTimeout(doWork, delay);
}

doWork();
