//todo-list 이벤트
document.querySelector('.todo-list').addEventListener('click', e => {
    //삭제
    if (e.target.matches('.delete')) {
        if (e.target.previousElementSibling.previousElementSibling.previousElementSibling.checked) {
            e.target.parentNode.remove();
        }
        //수정
    } else if (e.target.matches('.modify')) {
        if (e.target.previousElementSibling.previousElementSibling.checked) {
            const $modifyInput = document.createElement('input');
            $modifyInput.value = e.target.previousElementSibling.textContent;
            e.target.previousElementSibling.classList.add('hide');
            e.target.insertAdjacentElement('beforebegin', $modifyInput);
            e.target.textContent = 'ㅁㅁ';
            e.target.classList.replace('modify', 'ok');
            e.target.nextElementSibling.classList.replace('delete', 'cancel');
        }
        //수정확인
    } else if (e.target.matches('.ok')) {
        e.target.previousElementSibling.previousElementSibling.textContent = e.target.previousElementSibling.value;
        e.target.previousElementSibling.remove();
        e.target.previousElementSibling.classList.remove('hide');
        e.target.classList.replace('ok', 'modify');
        e.target.textContent = 'ㅇㅇ';
        //수정취소
    } else if (e.target.matches('.cancel')) {
        e.target.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.previousElementSibling.classList.remove('hide');
        e.target.previousElementSibling.classList.replace('ok', 'modify');
        e.target.classList.replace('cancel', 'delete');
        e.target.previousElementSibling.textContent = 'ㅇㅇ';
    }
});