const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export default async function fetchCompetitionDetails(
  id: string
): Promise<any> {
  try {
    const response = await fetch(`${SERVER_URL}/competition/sr:season:114317`);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching competition details:", error);
    throw new Error("Error fetching competition details");
  }
}
