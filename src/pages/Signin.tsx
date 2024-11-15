import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const onSubmit = ()=> {
    axios.post('https://koitbuddy.org/user/login', {
      "user_id":id,
      password
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem("cid", res.data.id)
        navigate('/')
      }
    })
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start space-y-1.5 ">
                <Label htmlFor="ID" className="text-xs">
                  아이디
                </Label>
                <Input
                  id="ID"
                  placeholder="아이디를 입력해 주세요."
                  value={id}
                  onChange={(evt) => setId(evt.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="password" className="text-xs">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요."
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="text-xs text-right">
            <span>회원이 아니신가요? </span> <a href="/signup">회원가입하기</a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button variant="outline" className="w-full rounded-full" onClick={onSubmit}>
          로그인
        </Button>
      </CardFooter>
    </Card>
  )
}
