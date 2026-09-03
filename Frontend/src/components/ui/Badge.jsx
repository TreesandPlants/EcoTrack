function Badge({

children,

color="green"

}){

const colors={

green:
"bg-green-100 text-green-700",

blue:
"bg-blue-100 text-blue-700",

red:
"bg-red-100 text-red-700",

yellow:
"bg-yellow-100 text-yellow-700",

};

return(

<span
className={`
px-4
py-2
rounded-full
text-sm
font-semibold
${colors[color]}
`}
>

{children}

</span>

);

}

export default Badge;