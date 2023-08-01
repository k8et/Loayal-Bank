export function getThemeClass(theme: string, styles: any  ): string {
    return `${styles.main} ${theme === "light" ? styles.lightTheme : styles.darkTheme}`;
}
