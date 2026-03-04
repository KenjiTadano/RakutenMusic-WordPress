document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[name="answers[42057_285146]"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      document.getElementById('option1').style.display = this.value === '792928' ? 'block' : 'none';
      document.getElementById('option2').style.display = this.value === '792930' ? 'block' : 'none';
    });
  });
});
