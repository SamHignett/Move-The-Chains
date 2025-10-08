using AutoMapper;

namespace Infrastructure.Clients.Team.Tank01
{
    public class TeamDtoToTeamResolver : IValueResolver<Tank01TeamDto, Domain.Entities.Team, Domain.Entities.Team>
    {
        public Domain.Entities.Team Resolve(Tank01TeamDto src, Domain.Entities.Team dest, Domain.Entities.Team destMember, ResolutionContext context)
        {
            return new Domain.Entities.Team
            {
                ID = src.TeamAbv,
                Name = src.TeamName,
                City = src.TeamCity,
            };
        }
    }

    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Tank01TeamDto, Domain.Entities.Team>()
                .ForMember(dest => dest, opt => opt.MapFrom<TeamDtoToTeamResolver>());
        }
    }
}

