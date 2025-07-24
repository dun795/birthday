
        let countdownTimer;
        let responses = [];

        function checkName() {
            const name = document.getElementById('nameInput').value.trim().toLowerCase();
            
            if (name === 'Adivhaho') {
                document.getElementById('nameInputSection').classList.add('hidden');
                document.getElementById('birthdaySection').classList.remove('hidden');
                
                createConfetti();
                startCountdown();
            } else {
                alert('This special birthday surprise is only for Adivhaho! 🎂');
                document.getElementById('nameInput').value = '';
            }
        }

        function createConfetti() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa726', '#ab47bc'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 3 + 's';
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 100);
            }
        }

        function startCountdown() {
            let timeLeft = 10; // 1 minute in seconds
            const countdownElement = document.getElementById('countdown');
            
            countdownTimer = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownElement.textContent = `Something special coming in: ${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(countdownTimer);
                    showQuestion();
                }
                timeLeft--;
            }, 1000);
        }

        function showQuestion() {
            document.getElementById('birthdaySection').classList.add('hidden');
            document.getElementById('questionSection').classList.remove('hidden');
        }

        function handleResponse(response) {
            if (response === 'yes') {
                // Send notification via email
                sendNotification(response);
                
                // Save response to local storage as backup
                const responseData = {
                    name: 'Adivhaho',
                    birthday: '21st',
                    date: new Date().toISOString(),
                    response: 'yes',
                    message: 'Accepted the date invitation! 💖',
                    timestamp: Date.now()
                };
                
                responses.push(responseData);
                
                // Show success message with flowers and love
                document.getElementById('questionSection').innerHTML = `
                    <h2>💖 Thank You Beautiful! 💖</h2>
                    <div class="flowers-container">
                        <div class="flower">🌹</div>
                        <div class="flower">🌸</div>
                        <div class="flower">🌺</div>
                        <div class="flower">🌻</div>
                        <div class="flower">🌷</div>
                    </div>
                    <div class="message">
                        <p>💕 Thank you for saying yes, beautiful! 💕</p>
                        <p>You've just made me the happiest person alive! ✨</p>
                        <p>I can't wait to spend this special time with you! 🥰</p>
                        <p><strong>Get ready for the most amazing date ever! 💖</strong></p>
                    </div>
                    <div class="love-emojis">
                        <span class="floating-heart">💖</span>
                        <span class="floating-heart">💕</span>
                        <span class="floating-heart">💗</span>
                        <span class="floating-heart">💘</span>
                        <span class="floating-heart">💝</span>
                    </div>
                `;
                
                createConfetti();
                
            } else {
                // Show error section
                document.getElementById('questionSection').classList.add('hidden');
                document.getElementById('errorSection').classList.remove('hidden');
            }
        }

        function sendNotification(response) {
            // Method 1: Email via mailto (opens her email client)
            const subject = "🎉 AMAZING NEWS - Adivhaho said YES! 🎉";
            const body = `Hey!\n\nGreat news! Adivhaho just responded to your birthday surprise website!\n\nHer response: ${response.toUpperCase()}! 💖\n\nDate & Time: ${new Date().toLocaleString()}\n\nTime to plan that special date! 🥳\n\nCongratulations! 🎊`;
            
            // This will open her email client to send you an email
            window.location.href = `mailto:duncansihongo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Method 2: Alternative - Use a webhook service (you'd need to set this up)
            // sendWebhookNotification(response);
        }

        // Alternative method using webhook (you'd need to set up a service like Formspree)
        function sendWebhookNotification(response) {
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Adivhaho',
                    response: response,
                    message: `Adivhaho said ${response} to the date invitation!`,
                    timestamp: new Date().toISOString()
                })
            }).catch(error => {
                console.log('Notification sent via email instead');
            });
        }

        function goBackToQuestion() {
            document.getElementById('errorSection').classList.add('hidden');
            document.getElementById('questionSection').classList.remove('hidden');
        }

        // Allow Enter key to submit name
        document.getElementById('nameInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkName();
            }
        });
    
