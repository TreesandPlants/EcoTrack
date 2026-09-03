function EmptyState({

icon="🌿",

title,

description

}){

return(

<div
className="
text-center
py-20
"
>

<div className="text-6xl">

{icon}

</div>

<h2
className="
text-2xl
font-bold
mt-6
"
>

{title}

</h2>

<p
className="
mt-3
text-gray-500
"
>

{description}

</p>

</div>

);

}

export default EmptyState;