# codespaces-test2_20260703

Node.js와 Express로 만든 간단한 REST API 서버입니다. `items` 리소스에 대한 생성, 조회, 수정, 삭제 기능을 제공합니다.

## 프로젝트 구조

```text
.
├── README.md
├── package.json
├── package-lock.json
└── server.js
```

- `server.js`: Express 서버와 API 라우트가 정의된 메인 파일
- `package.json`: 실행 스크립트와 의존성 정보
- `package-lock.json`: 설치된 npm 패키지 버전 잠금 파일

## 요구 사항

- Node.js 18 이상
- npm

현재 의존성 중 `express`가 Node.js 18 이상을 요구합니다.

## 설치

```bash
npm install
```

## 실행

```bash
npm start
```

기본 포트는 `3000`입니다. 실행 후 아래 주소로 접근할 수 있습니다.

```text
http://localhost:3000
```

포트를 변경하려면 `PORT` 환경 변수를 지정합니다.

```bash
PORT=4000 npm start
```

## API 엔드포인트

| Method | Path | 설명 |
| --- | --- | --- |
| `GET` | `/` | API 안내와 엔드포인트 목록 조회 |
| `GET` | `/health` | 서버 상태 확인 |
| `GET` | `/items` | 전체 아이템 조회 |
| `GET` | `/items/:id` | 특정 아이템 조회 |
| `POST` | `/items` | 새 아이템 생성 |
| `PUT` | `/items/:id` | 특정 아이템 수정 |
| `DELETE` | `/items/:id` | 특정 아이템 삭제 |

## 요청 예시

서버 상태 확인:

```bash
curl http://localhost:3000/health
```

전체 아이템 조회:

```bash
curl http://localhost:3000/items
```

새 아이템 생성:

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Orange","description":"Orange fruit"}'
```

아이템 수정:

```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Green Apple","description":"Fresh green apple"}'
```

아이템 삭제:

```bash
curl -X DELETE http://localhost:3000/items/1
```

## 참고 사항

- 데이터는 `server.js`의 메모리 배열에 저장됩니다.
- 서버를 재시작하면 생성, 수정, 삭제한 데이터는 초기 상태로 돌아갑니다.
- 정의되지 않은 경로는 `404`와 `{ "message": "API Not Found" }` 응답을 반환합니다.
