import axios from "axios";
import { login } from "@/shared/api/users";

function ArticlesPage() {
  const postTestLogin = async () => {
    try {
      const res = await login({
        payload: { email: "mmgg@codeit.com", password: "asdf1234" } as any,
      });
      console.log("[login] response:", res);

      alert("로그인 성공");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          "[login] axios error:",
          err.response?.status,
          err.response?.data
        );
        alert(`로그인 실패: ${err.response?.status}`);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>articles</h1>
      <button onClick={postTestLogin}>테스트 로그인</button>
    </div>
  );
}

export default ArticlesPage;
