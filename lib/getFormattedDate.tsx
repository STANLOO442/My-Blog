export default function getFormattedDate(dateString: string): string {
  console.log("Input dateString:", dateString);
  try {
    const date = new Date(dateString);
    console.log("Parsed Date:", date);
    return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
  } catch (error) {
    console.error("Error:", error);
    // Handle error gracefully or return a default value
    return "Invalid Date";
  }
}
