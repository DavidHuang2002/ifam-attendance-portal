"use client"
// test the API
import { Button } from "antd";
import { postAttednace } from "@/utils/service";


export default function Test(){
    return (
        <div>
        <Button onClick={
            async () => {
                const res = await postAttednace("xx", "david.test@x.com")
                console.log(res);

                const docRef = await res.json();
                console.log(docRef);
            }
        }>Test</Button>
        </div>
    )
}
