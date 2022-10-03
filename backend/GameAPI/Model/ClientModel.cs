using System.ComponentModel.DataAnnotations;
using GameAPI.Model;

namespace GameAPI.Model
{
    public class ClientModel : BaseEntity
    {
        public string Name { get; set; }
        public Guid Lobby {get; set; }
    }
}