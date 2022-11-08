using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Model;
using Microsoft.EntityFrameworkCore;
using GameAPI.Context;

namespace GameAPI.Data.Lobby
{
    public class LobbyRepository : ILobbyRepository
    {
        public LobbyRepository(GameContext context)
        {
            _context = context;
        }
        private readonly GameContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<ICollection<LobbyModel>> GetLobbyListAsync()
        {
            var list = _context.Lobbies.OrderBy(x => x.Name).ToList();

            return await Task.FromResult(list);
        }
        public async Task<LobbyModel> GetLobbyByIdAsync(Guid id)
        {
            LobbyModel model = await _context.Lobbies.FirstOrDefaultAsync(x => x.Id == id);
            return model;
        }


        public async Task CreateLobbyAsync(LobbyModel request)
        {
            await _context.Lobbies.AddAsync(request);
        }

        public async Task UpdateLobbyAsync(LobbyModel request)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteLobbyAsync(LobbyModel request)
        {
            if (request is null)
            {
                throw new ArgumentException(nameof(request));
            }
            await Task.FromResult(_context.Lobbies.Remove(request));

        }

    }
}