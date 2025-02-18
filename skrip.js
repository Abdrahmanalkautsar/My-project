// this source code by ishratjahanpinky2@gmail.com

 // Sound functions
        function playSuccessSound() {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, context.currentTime); // C5 note
            gainNode.gain.setValueAtTime(0.1, context.currentTime);

            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
            oscillator.stop(context.currentTime + 1);
        }

        // Floating hearts animation
        function createHearts(event) {
            const button = event.target;
            const rect = button.getBoundingClientRect();
            
            for(let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.className = 'love-particle';
                heart.textContent = ['❤️', '💖', '💘', '💝', '💕'][Math.floor(Math.random() * 5)];
                heart.style.left = `${Math.random() * rect.width}px`;
                heart.style.fontSize = `${Math.random() * 20 + 15}px`;
                heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
                button.parentElement.appendChild(heart);
                
                // Remove element after animation
                setTimeout(() => heart.remove(), 3000);
            }
        }

        // Modified calculateLove function with working sound
        function calculateLove() {
            const name1 = document.getElementById('name1').value.trim();
            const name2 = document.getElementById('name2').value.trim();
            const result = document.getElementById('result');
            const message = document.getElementById('message');
            const progress = document.getElementById('progress');

            if (!name1 || !name2) {
                alert('Please enter both names!');
                return;
            }

            const seed = (name1 + name2).toLowerCase().replace(/ /g, '');
            let percentage = 0;
            for (let i = 0; i < seed.length; i++) {
                percentage += seed.charCodeAt(i);
            }
            percentage = (percentage % 81) + 20;

            result.classList.remove('show');
            progress.style.width = '0%';

            setTimeout(() => {
                playSuccessSound(); // Play the new sound
                progress.style.width = `${percentage}%`;
                
                let current = 0;
                const interval = setInterval(() => {
                    result.textContent = `${current}%`;
                    current++;
                    if (current > percentage) {
                        clearInterval(interval);
                        result.textContent = `${percentage}%`;
                        result.classList.add('show');
                        showMessage(percentage);
                    }
                }, 30);
            }, 500);
        }

        function showMessage(percentage) {
            const messages = [
                { min: 0, max: 39, text: "Terus mencari! Semoga beruntung lain kali!" },
                { min: 40, max: 59, text: "Berpotensi! Butuh lebih banyak percikan!" },
                { min: 60, max: 79, text: "Hubungan yang bagus! Layak untuk dijelajahi!" },
                { min: 80, max: 90, text: "Cinta sejati! Pasangan yang cocok!" },
                { min: 91, max: 100, text: "Belahan jiwa! Dibuat untuk satu sama lain!" }
            ];

            const match = messages.find(m => percentage >= m.min && percentage <= m.max);
            document.getElementById('message').textContent = match.text;
        }
