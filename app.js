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
            const $modifyInput = document.createElement('input'); //인풋요소 생성
            $modifyInput.value = e.target.previousElementSibling.textContent; //인풋요소의 value에 원래 텍스트 삽입
            $modifyInput.classList.add('text');
            e.target.previousElementSibling.classList.add('hide'); //원래 텍스트 숨기기
            e.target.insertAdjacentElement('beforebegin', $modifyInput); //인풋요소 삽입
            e.target.classList.replace('lnr-checkmark-circle', 'lnr-undo'); //수정아이콘 변경
            e.target.classList.replace('modify', 'ok'); //수정버튼의 클래스 확인으로 변경
            e.target.nextElementSibling.classList.replace('delete', 'cancel'); //삭제버튼의 클래스 취소로 변경
            e.target.previousElementSibling.focus();//인풋으로 포커스
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