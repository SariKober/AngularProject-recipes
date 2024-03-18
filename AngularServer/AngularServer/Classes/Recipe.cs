namespace AngularServer.Classes
{
    public class Recipe
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string CategoryCode { get; set; }
        public int PreparationTime { get; set; }
        public int LevelOfDifficulty { get; set; }
        public DateTime DateAdded { get; set; }
        public List<string> ListOfComponents { get; set; }
        public List<string> Preparation { get; set; }
        public string UserCodeAdded { get; set; }
        public string Image { get; set; }


    }
}
