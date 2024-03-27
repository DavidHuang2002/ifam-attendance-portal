"use client"
// test the API
import { Button } from "antd";
import { postAttednace } from "@/constants/api-endpoints";


export default function Test(){
    return (
        <div>
        <Button onClick={
            async () => {
                // approach1: use define a function in service that calls API
                // separate the logic with view
                const res = await postAttednace("xx", "david.test@x.com")
                console.log(res);

                const docRef = await res.json();
                console.log(docRef);
                
                // approach2: a quick and easy way - directly call the API
                // const response = await fetch('/api/attendance', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         event: "xx",
                //         email: "ss"})
                // });
            }
        }>Test</Button>
        </div>
    )
}
