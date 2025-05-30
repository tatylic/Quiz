// Danh sách câu hỏi mẫu, bạn có thể thêm/bớt tùy ý
const questions = [
  {
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế"],
    answer: 0
  },
  {
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "Màu nào là màu của lá cây?",
    options: ["Đỏ", "Vàng", "Xanh lá", "Tím"],
    answer: 2
  },
  {
    question: "Sông nào dài nhất Việt Nam?",
    options: ["Sông Hồng", "Sông Mekong", "Sông Đà", "Sông Đồng Nai"],
    answer: 1
  },
  {
    question: "Ai là tác giả Truyện Kiều?",
    options: ["Nguyễn Du", "Nguyễn Trãi", "Hồ Xuân Hương", "Tố Hữu"],
    answer: 0
  },
  {
    question: "Hình nào là hình tam giác?",
    options: ["⚫", "⬛", "🔺", "⬜"],
    answer: 2
  },
  {
    question: "Tháng có số ngày ít nhất trong năm?",
    options: ["Tháng 2", "Tháng 4", "Tháng 6", "Tháng 9"],
    answer: 0
  },
  {
    question: "Quốc gia nào lớn nhất thế giới?",
    options: ["Trung Quốc", "Mỹ", "Nga", "Canada"],
    answer: 2
  },
  {
    question: "Chữ cái đầu tiên trong bảng chữ cái tiếng Việt?",
    options: ["A", "Ă", "Â", "B"],
    answer: 0
  },
  {
    question: "Biển nào lớn nhất Việt Nam?",
    options: ["Biển Đông", "Biển Đen", "Biển Đỏ", "Biển Nhật Bản"],
    answer: 0
  }
];

// Hàm đảo thứ tự mảng (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i &gt; 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let selectedQuestions = [];
let userAnswers = [];

function startQuiz() {
  const num = parseInt(document.getElementById('numQuestions').value);
  if (isNaN(num) || num &lt; 1 || num &gt; questions.length) {
    alert(`Vui lòng chọn số lượng câu hỏi từ 1 đến ${questions.length}`);
    return;
  }
  selectedQuestions = [...questions];
  shuffle(selectedQuestions);
  selectedQuestions = selectedQuestions.slice(0, num);

  // Đảo thứ tự đáp án từng câu
  selectedQuestions.forEach(q =&gt; {
    const correct = q.options[q.answer];
    shuffle(q.options);
    q.answer = q.options.indexOf(correct);
  });

  userAnswers = Array(num).fill(null);
  renderQuiz();
  document.getElementById('result').innerHTML = '';
}

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  selectedQuestions.forEach((q, idx) =&gt; {
    let html = `<div><b>Câu ${idx + 1}: ${q.question}</b><br>`;
    q.options.forEach((opt, oidx) =&gt; {
      html += `<label>
        <input value="${oidx}" name="q${idx}" type="radio">
        ${opt}
      </label><br>`;
    });
    html += '</div><hr>';
    container.innerHTML += html;
  });
  container.innerHTML += `<button>Nộp bài</button>`;
}

function selectAnswer(qIdx, oIdx) {
  userAnswers[qIdx] = oIdx;
}

function submitQuiz() {
  let score = 0;
  selectedQuestions.forEach((q, idx) =&gt; {
    if (userAnswers[idx] === q.answer) score++;
  });
  document.getElementById('result').innerHTML = `Bạn đúng ${score}/${selectedQuestions.length} câu!`;
}

// Gán các hàm vào window để gọi được từ HTML
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.submitQuiz = submitQuiz;
