import React from "react";
import Container from "../component/container/Container.jsx";


function Home() {
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    
                    {/* {posts.map((post)=> {
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    })} */}
                </div>
            </Container>
        </div>
    )
}

export default Home;