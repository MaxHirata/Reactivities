using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDTO>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ActivityDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;

            }
            public async Task<ActivityDTO> Handle(Query request, CancellationToken cancellationToken)
            {

                //throw new Exception("Computer Temp Error");
                //var activity = await _context.Activities.FindAsync(request.Id);

                //Eager Loading
                // var activity = await _context.Activities
                //     .Include(x => x.UserActivities)
                //     .ThenInclude(x => x.AppUser)
                //     .SingleOrDefaultAsync(x => x.Id == request.Id);

                //Lazy Loading after configuring Navigation props and startup
                var activity = await _context.Activities
                    .FindAsync(request.Id);

                

                if(activity == null){
                    //throw new Exception("Could not find activity");
                    throw new RestException(HttpStatusCode.NotFound, new {activity = "Not found"});
                }

                var activityToReturn = _mapper.Map<Activity, ActivityDTO>(activity);
                
                return activityToReturn;
            }
        }
    }
}