# API Document

## TEST
GET: `/api/test`
 - 테스트용 API
 - body
    ```
    {
        "method": "GET"
        "result": "This is test results."
    }
    ```

POST: `/api/test`
 - 테스트용 API
 - body
    ```
    {
        "method": "POST"
        "result": "This is test results."
    }
    ```

## USER

DELETE: `/api/user?uid=[유저아이디]`
 - 유저 삭제
 - `회원 세션 유지를 어떻게 할지..?`

GET: `/api/user?uid=[유저아이디]`
 - 사용자 정보 확인

POST: `/api/user?uid=[유저아이디]`
 - 사용자 추가 (계정 생성)

PATCH: 미구현
 - 아이디 및 비밀번호 변경

___

## 기록 관리

GET: `/api/data?[어떠한 조건으로 정보를 받을지?]`
 - 사용자 랭킹 정보 조회

POST: `/api/data?stage_id=[스테이지 번호]&elapsed_time=[달린 총 시간(초)&[또 추가할 내용..?]]`
 - 사용자 랭킹 정보 추가

PATCH: 미구현
 - 랭킹은 최초 등록 후 영구적으로 유지됨

DELETE: 미구현
 - 랭킹은 최초 등록 후 영구적으로 유지됨

