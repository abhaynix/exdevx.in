try {
  const theme = localStorage.getItem('chaiui-theme');
  document.documentElement.classList.toggle('dark', theme !== 'light');
  document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.content = theme === 'light' ? '#f7f5f0' : '#08090c';
  });
} catch {
  document.documentElement.classList.add('dark');
}
