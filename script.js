document.addEventListener("DOMContentLoaded", function() {
    // Interactive Quiz
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(response => response.json())
        .then(data => {
            const quizData = data.results.map(item => ({
                question: item.question,
                options: [...item.incorrect_answers, item.correct_answer],
                answer: item.correct_answer
            }));

            let currentQuestionIndex = 0;
            const quizContainer = document.getElementById('quiz');
            const nextButton = document.getElementById('next-question');

            function showQuestion(index) {
                const q = quizData[index];
                quizContainer.innerHTML = `
                    <p>${q.question}</p>
                    ${q.options.map(option => `<button class="quiz-option" data-answer="${q.answer}" onclick="checkAnswer(event)">${option}</button>`).join('')}
                `;
            }

            window.checkAnswer = function(event) {
                const selected = event.target.textContent;
                const correct = event.target.dataset.answer;
                alert(selected === correct ? "Correct!" : "Wrong!");
                nextButton.style.display = 'block';
            };

            nextButton.addEventListener('click', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    showQuestion(currentQuestionIndex);
                    nextButton.style.display = 'none';
                } else {
                    quizContainer.innerHTML = "<p>You've completed the quiz!</p>";
                    nextButton.style.display = 'none';
                }
            });

            showQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Error fetching quiz questions:', error));

    // Image Carousel
    let currentImageIndex = 0;
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    const carouselImage = document.getElementById('carousel-image');

    document.getElementById('prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        carouselImage.src = images[currentImageIndex];
    });

    document.getElementById('next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        carouselImage.src = images[currentImageIndex];
    });

    // Fetch Data from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = `
                <p>Location: ${data.name}</p>
                <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
