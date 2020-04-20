//get element

const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show error message
function showError(input, message) {
  const formControl = input.parentElement;  //先找到input的父元素，然后添加失败的class
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


//checkRequired input
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getKeyWords(input)}为必填项`);
    } else {
      showSuccess(input);
    }
  });
}

function getKeyWords(input) {
  return input.placeholder.slice(3);
}

//checkLength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getKeyWords(input)}最小长度为${min}个字符`);
  } else if (input.value.length > max) {
    showError(input, `${getKeyWords(input)}最大长度为${max}个字符`);
  } else {
    showSuccess(input);
  }
}

//checkEmail
function checkEmail(input) {
  const re = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, '请输入正确的邮箱格式');
  }
}

//checkPasswordsMatch
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '两次输入的密码不匹配');
  }
}

//event listener
form.addEventListener('submit', function (e) {
  e.preventDefault(); //阻止form表单提交时刷新

  checkRequired([userName, email, password, password2]);
  checkLength(userName, 3, 8);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  //进行判断，封装前的写法
  // if (userName.value === '') {
  //   showError(userName, '用户名为必填项');
  // } else {
  //   showSuccess(userName);
  // }
  //
  // if (email.value === '') {
  //   showError(email, '邮箱为必填项');
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, '请输入正确的邮箱格式');
  // } else {
  //   showSuccess(email);
  // }
  //
  // if (password.value === '') {
  //   showError(password, '密码为必填项');
  // } else {
  //   showSuccess(password);
  // }
  //
  // if (password2.value === '') {
  //   showError(password2, '确认密码为必填项');
  // } else {
  //   showSuccess(password2);
  // }
});