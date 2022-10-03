using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameAPI.Model;
using Microsoft.EntityFrameworkCore;
using GameAPI.Context;

namespace GameAPI.Data.Lobby
{
    public class SqlLobbyRepo : ILobbyRepo
    {
        public SqlLobbyRepo(GameContext context)
        {
            _context = context;
        }
        private readonly GameContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LobbyModel>> GetLobbyListAsync()
        {
            var lobbyList = _context.Lobbies.ToList();

            return await Task.FromResult(lobbyList);
        }
        public async Task<LobbyModel> GetLobbyByIdAsync(Guid id)
        {
            LobbyModel lobby = await _context.Lobbies.FirstOrDefaultAsync(x => x.Id == id);
            return lobby;
        }


        public async Task CreateLobbyAsync(LobbyModel lobbyModel)
        {
            await _context.Lobbies.AddAsync(lobbyModel);
        }

        public async Task UpdateLobbyAsync(LobbyModel lobbyModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteLobbyAsync(LobbyModel lobby)
        {
            if (lobby is null)
            {
                throw new ArgumentException(nameof(lobby));
            }
            await Task.FromResult(_context.Lobbies.Remove(lobby));

        }

    }
}