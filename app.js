// input 이벤트
const $form = document.querySelector('form');
const $input = document.querySelector('input');
const $ul = document.querySelector('ul');

$form.addEventListener('submit', e => {
    e.preventDefault();

    if ($input.value.trim() !== '') {
        const todo = `
                           <li>
                           <input type="checkbox">
                           <span class="text">${$input.value.trim()}</span>
                           <span class="lnr lnr-checkmark-circle modify"></span>
                           <span class="lnr lnr-cross-circle delete"></span>
                           </li>
                           `;

        $ul.insertAdjacentHTML('beforeend', todo);
        $input.value = '';

    } else {
        $input.setAttribute('placeholder', '필수값을 입력해주세요.!!');
        $input.classList.add('input-error');
        $input.focus();
        $input.addEventListener('keydown', () => {
            $input.classList.remove('input-error');
        });
        $input.addEventListener('click', () => {
            $input.classList.remove('input-error');
            $input.setAttribute('placeholder', '할 일을 입력해주세요.!!');
        });

    }

    $ul.addEventListener('click', e => {
        const $target = e.target
        if ($target.classList.contains('modfy')) {
            const $text = $target.previousElementSibling;
            const $newText = prompt('새로운 할 일을 입력하세요.', $text.textContent);
            if ($newText !== null && $newText.trim() === '') {
                $text.textContent = $text.trim()
            }

        }
    })
});

//check-box 이벤트
document.querySelector('.todo-list').addEventListener('click', e => {
    if(!e.target.matches('input[type="checkbox"]')) return;
    e.target.nextElementSibling.classList.toggle('checked', e.target.checked);
});

//todo-list 이벤트
document.querySelector('.todo-list').addEventListener('click', e => {
    //삭제
    if (e.target.matches('.delete')) {
        if (e.target.previousElementSibling.previousElementSibling.previousElementSibling.checked) {
            e.target.parentNode.classList.add('delMoving');
            setTimeout(() => {
                e.target.parentNode.remove()
            }, 500);
        }
        //수정
    } else if (e.target.matches('.modify')) {
        if (e.target.previousElementSibling.previousElementSibling.checked) {
            const $modifyInput = document.createElement('input'); //인풋요소 생성
            $modifyInput.value = e.target.previousElementSibling.textContent; //인풋요소의 value에 원래 텍스트 삽입
            $modifyInput.classList.add('text');
            e.target.previousElementSibling.classList.add('hide'); //원래 텍스트 숨기기
            e.target.insertAdjacentElement('beforebegin', $modifyInput); //인풋요소 삽입
            e.target.classList.replace('lnr-checkmark-circle', 'lnr-undo'); //수정아이콘 변경
            e.target.classList.replace('modify', 'ok'); //수정버튼의 클래스 확인으로 변경
            e.target.nextElementSibling.classList.replace('delete', 'cancel'); //삭제버튼의 클래스 취소로 변경
            e.target.previousElementSibling.focus(); // 인풋으로 포커스
        }
        //수정확인
    } else if (e.target.matches('.ok')) {
        e.target.previousElementSibling.previousElementSibling.textContent = e.target.previousElementSibling.value; //인풋의 값을 원래 텍스트에 삽입
        e.target.previousElementSibling.remove(); //인풋 제거
        e.target.previousElementSibling.classList.remove('hide'); //원래 텍스트 숨기기 해제
        e.target.classList.replace('ok', 'modify'); //
        e.target.classList.replace('lnr-undo', 'lnr-checkmark-circle');
        e.target.nextElementSibling.classList.replace('cancel', 'delete');
        //수정취소
    } else if (e.target.matches('.cancel')) {
        e.target.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.previousElementSibling.classList.remove('hide');
        e.target.previousElementSibling.classList.replace('ok', 'modify');
        e.target.classList.replace('cancel', 'delete');
        e.target.previousElementSibling.classList.replace('lnr-undo', 'lnr-checkmark-circle');
    }
});

// document.getElementById('enter').addEventListener('click', () => {
//     const $input = document.querySelector('.input input');
//     document.querySelector('.todo-list').insertAdjacentHTML('beforeend', `<li><input type="checkbox"><span class="text">${$input.value}</span><span class="lnr lnr-checkmark-circle modify"></span><span class="lnr lnr-cross-circle delete"></span></li>`);
//     $input.value = '';
// });