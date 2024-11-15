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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState("")
  const [workLifeRatio, setWorkLifeRatio] = useState([50])
  const [job, setJob] = useState("")
  const [furtherDetails, setFurtherDetails] = useState("")

  const navigate = useNavigate()
  
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    const user = {
      user_id: id,
      password,
      name,
      age,
      gender,
      workLifeRatio: `${workLifeRatio[0]}:${100 - workLifeRatio[0]}`,
      job,
      furtherDetails
  }
    axios.post('https://koitbuddy.org/user/signup', user).then((res)=>{
      if(res.status === 200) {
        localStorage.setItem('usrid', id)
        navigate('/main')
      }
    })
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start space-y-1.5 ">
                <Label htmlFor="id" className="text-xs">
                  아이디
                </Label>
                <Input
                  id="id"
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
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5 ">
                <Label htmlFor="name" className="text-xs">
                  이름
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col items-start space-y-1.5 ">
                  <Label htmlFor="age" className="text-xs">
                    나이
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(evt) => setAge(parseInt(evt.target.value))}
                  />
                </div>
                <div className="flex flex-col items-start space-y-1.5 ">
                  <Label className="text-xs">성별</Label>
                  <Select
                    value={gender}
                    onValueChange={(val) => setGender(val)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="female">여자</SelectItem>
                        <SelectItem value="male">남자</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-1.5 ">
                <div className="flex felx-row items-center gap-1">
                  <Label className="text-xs">워라밸</Label>
                  <span className="text-xs ">
                    [{workLifeRatio}, {100 - workLifeRatio[0]}]
                  </span>
                </div>
                <Slider
                  value={workLifeRatio}
                  max={100}
                  step={5}
                  onValueChange={(valance) => {
                    setWorkLifeRatio(valance)
                  }}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5 ">
                <Label htmlFor="job" className="text-xs">
                  직업
                </Label>
                <Input
                  id="job"
                  value={job}
                  onChange={(evt) => setJob(evt.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5 ">
                <Label htmlFor="furtherDetails" className="text-xs">
                  직업 설명
                </Label>
                <Textarea
                  id="furtherDetails"
                  value={furtherDetails}
                  onChange={(evt) => setFurtherDetails(evt.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button variant="outline" className="w-full rounded-full" onClick={onSubmit}>
          회원가입
        </Button>
      </CardFooter>
    </Card>
  )
}
