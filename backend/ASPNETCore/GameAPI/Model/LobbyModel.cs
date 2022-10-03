using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using GameAPI.Model;

namespace GameAPI.Model
{
    public class LobbyModel : BaseEntity
    {
        public string Name { get; set; }
        public int Player1 { get; set; }
        public int Player2 { get; set; }
    }
}