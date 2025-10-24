import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import TeamInfoCard from "@/app/stats/components/team/TeamInfoCard";

describe("TeamInfoCard", () => {
  const mockInfo = {
    name: "Mock Team",
    logoURL: "https://via.placeholder.com/150",
    city: "Mock City",
    conference: "Mock Conference",
    division: "Mock Division",
    wins: 10,
    losses: 5,
    ties: 2,
  };

  it("renders team information correctly", () => {
    const { getByText, getByAltText } = render(<TeamInfoCard info={mockInfo} />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    
    expect(getByAltText("Logo")).toHaveAttribute("src", mockInfo.logoURL);
    expect(getByText(mockInfo.name)).toBeInTheDocument();
    expect(getByText(`Location: ${mockInfo.city}`)).toBeInTheDocument();
    expect(getByText(`Division/Conference: ${mockInfo.conference} ${mockInfo.division}`)).toBeInTheDocument();
    expect(getByText(`Current Season Record: ${mockInfo.wins}-${mockInfo.losses}-${mockInfo.ties}`)).toBeInTheDocument();
  });
});