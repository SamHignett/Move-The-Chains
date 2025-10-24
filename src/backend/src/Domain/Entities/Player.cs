namespace Domain.Entities;

public class Player(int age, string position, string team, string name)
{
    public string Name { get; private set; } = name;

    public int Age { get; private set; } = age;

    public string Team { get; private set; } = team;

    public string Position { get; private set; } = position;
}