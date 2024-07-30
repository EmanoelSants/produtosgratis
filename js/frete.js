document.addEventListener('DOMContentLoaded', function () {
    var paymentCode = '00020101021126840014br.gov.bcb.pix013643b5ec78-99c1-4a7c-bf9b-59299e4b16360222FRETE FIXO  Luxe Glow 520400005303986540513.005802BR5914EVELYN MARTINS6009ARAPIRACA62070503***630422CA'; // Your full payment code here
    var displayCode = paymentCode.slice(0, 6) + '...' + paymentCode.slice(-4);

    // Display truncated payment code
    document.getElementById('payment-code').innerText = displayCode;

    // Generate QR code after setting the payment code
    var qr = new QRious({
        element: document.getElementById('qr-code'),
        value: paymentCode, // Your payment code here
        size: 200
    });

    // Copy payment code to clipboard
    var copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(paymentCode).then(function () {
            copyButton.textContent = 'Copiado';
            copyButton.classList.add('copied');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    });

    // Timer
    var timeLeft = 300;
    var timerElement = document.getElementById('time');
    var progressElement = document.getElementById('progress');

    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        progressElement.style.width = `${(timeLeft / 420) * 100}%`;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Code expires
            document.getElementById('payment-code').innerText = 'Código expirado';
            qr.set({
                value: ''
            });
        }
    }

    setInterval(updateTimer, 1000);
});
