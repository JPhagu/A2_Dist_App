
using System.Net.Http.Json;


namespace GreetingClient
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();
        private const string BaseUrl = "http://localhost:3000/api/";


        static async Task Main(string[] args)
        {
            Console.WriteLine("Fetching available times of day and languages...\n");

            var timesOfDay = await FetchTimesOfDay();
            var languages = await FetchSupportedLanguages();

            Console.WriteLine("Available Times of Day:");
            for (int i = 0; i < timesOfDay.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {timesOfDay[i]}");
            }

            Console.WriteLine("\nAvailable Languages:");
            for (int i = 0; i < languages.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {languages[i]}");
            }

            Console.Write("\nSelect a time of day (number): ");
            int timeOfDayIndex = int.Parse(Console.ReadLine()) - 1;

            Console.Write("Select a language (number): ");
            int languageIndex = int.Parse(Console.ReadLine()) - 1;

            // New section for selecting tone
            Console.Write("Select a tone (Formal/Casual, default is Formal): ");
            string tone = Console.ReadLine();
            tone = string.IsNullOrWhiteSpace(tone) ? "Formal" : tone; // Default to Formal if input is empty

            var greeting = await GetGreeting(timesOfDay[timeOfDayIndex], languages[languageIndex], tone);
            Console.WriteLine($"\nGreeting: {greeting.Message} (Tone: {greeting.Tone})");
        }

        private static async Task<List<string>> FetchTimesOfDay()
        {
            return await client.GetFromJsonAsync<List<string>>(BaseUrl + "timesOfDay");
        }

        private static async Task<List<string>> FetchSupportedLanguages()
        {
            return await client.GetFromJsonAsync<List<string>>(BaseUrl + "languages");
        }
        private static async Task<GreetingResponse> GetGreeting(string timeOfDay, string language, string tone)
        {
            var request = new GreetingRequest
            {
                TimeOfDay = timeOfDay,
                Language = language,
                Tone = tone // Include the Tone property
            };

            // Corrected the URL here to match your Node.js route
            var response = await client.PostAsJsonAsync(BaseUrl + "greeting", request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<GreetingResponse>();
        }
    }

    public class GreetingRequest
    {
        public string? TimeOfDay { get; set; }
        public string? Language { get; set; }
        public string? Tone { get; set; } // Add Tone property
    }

    public class GreetingResponse
    {
        public string? Message { get; set; }
        public string? Tone { get; set; } // Include Tone in response
    }
}