
const improvementOption=["Front-end Projects","Back-end Projects","Data Visualization",
                          "Challenges","Open Source Community","Gitter help rooms",
                          "Videos","City Meetups","Wiki","Forum","Additional Courses"
                        ];

let allowedSpecialCharacter=['!', '#', '$', '%', '&', "'", '*', '+', '-', '/',
                             '=', '?', '^', '_', '`', '{', '|', '}', '~'];

let errors=[];

const fetchImprovementOptions=()=>{
    let selectedImprovements=[]
    for(let i=0;i<improvementOption.length;i++){
        if(document.getElementById(i).checked){
            selectedImprovements.push(improvementOption[i]);
        }
    }
    return selectedImprovements;
}

window.onload=()=>{
    document.getElementById("formId").addEventListener("submit" , (e) => { 
        e.preventDefault();
        checkForm();
    });
}


function checkForm(){
    if(validateForm()){
        alert("Form submitted sucessfully");
    }
}

function push(errors,error){
    errors.push("<li>"+error+"</li>");
}

const validateName=(errors,name)=>{
    if(name.length==0){
        push(errors,"Name not be empty");
    }
}

const validateEmail=(errors,email)=>{
    const parts=email.split("@");
    if(parts==undefined){
        push(errors,"Enter email");
        return;
    }
    if(parts.length!=2){
        push(errors,"Email format is incorrect");
        return;
    }
    if(parts[0].length==0)push(errors,"Email personal info must not be empty");
    if(parts[1].length==0)push(errors,"Email domaion must not be empty");

    outerLoop: for(let index=0;index<parts[0].length;index++){

        const ch=parts[0].charAt(index);
        if( (ch>='A' && ch<='Z') ||(ch>='a' && ch<='z') || (ch>='0' && ch<='9') )continue;

        for(let char of allowedSpecialCharacter){
            if(char==ch) continue outerLoop;
        }

        if(ch=='.'){
            if(index==0 || index==parts[0].length-1){
                push(errors,"dot . must not be first or last character of email personal info");
                continue ;
            }
            else if(parts[0].charAt(index-1)=='.'){
                push(errors,"dot . must not be consecutive in mail");
                continue;
            }
        }
        push(errors,"Email personal info cotains unallowed character");
    }
};

const validatePassword=(errors,password)=>{
    if(password.length<8){
        push(errors,"Password length must be greater than 8");
        return;
    }
    let containsNumber=false,containsText=false,lowerCase=false,upperCase=false,
    specialCharacter=false;

    for(let index=0;index<password.length;index++){
        let c=password.charAt(index);
        if(c>='a' && c<='z'){
            lowerCase=true;containsText=true;
        }
        if(c>='A'&& c<='Z'){
            upperCase=true;containsText=true;
        }
        if(c>='0' && c<='9'){
            containsNumber=true;
        }
        if(c=='@' || c=='#' || c=='$' || c=='%' || c=='^' || c=='&' || c=='*'){
            specialCharacter=true;
        }
    }
    if(containsNumber && containsText && lowerCase && upperCase && specialCharacter)return true;
    
    if(!containsNumber)push(errors,"Password must contains numbers");
    if(!containsText)push(errors,"Password must contains Text");
    if(!lowerCase)push(errors,"Password must contains atleast 1 lowercase text");
    if(!upperCase)push(errors,"Password must contains atleast 1 uppercase text");
    if(!specialCharacter)push(errors,"Password must contains at least 1 special character");
}

const validateAge=(errors,age)=>{
    if(age>100){
        push(errors,"Enter valid age");
    }
}


const validateConfirmPassword=(errors,password,confirmPassword)=>{
    if(String(password).localeCompare(String(confirmPassword))!=0){
         push(errors,"Password don't match");
    }
}


const validateCurrentRole=(errors,currentRole)=>{
    if(currentRole.length==0){
        push(errors,"Select current role");
    }
}

const validateFavouriteFeatures=(errors,favouriteFeature)=>{
    if(favouriteFeature.length==0){
        push(errors,"Select favourite feature");
    }
}


const validateForm=()=>{
    errors=[];

    const name=document.getElementById("name").value;
    validateName(errors,name);

    const email=document.getElementById("email").value;
    validateEmail(errors,email);
   
    const password=document.getElementById("password").value;
    validatePassword(errors,password);

    const confirmPassword=document.getElementById("confirmPassword").value;
    validateConfirmPassword(errors,password,confirmPassword);

    const age=document.getElementById("age").value;
    validateAge(errors,age);
    
    const currentRole=document.getElementById("currentRole").value;
    validateCurrentRole(errors,currentRole);

    var recommend;
    let selected=document.querySelector('input[name = "recommend"]:checked');
    if(selected!=null)recommend=selected.value;

    const favouriteFeature=document.getElementById("favouriteFeature").value;
    validateFavouriteFeatures(errors,favouriteFeature);

    const selectedImprovements=fetchImprovementOptions();
    const comment=document.getElementById("comment").value;

    if(errors.length==0){
        console.log({"name":name});
        console.log({"email":email});
        console.log({"password":password});
        console.log({"confirmPassword":confirmPassword});
        console.log({"age":age});
        console.log({"currentRole":currentRole});
        console.log({"recommend":recommend});
        console.log({"favouriteFeature":favouriteFeature});
        console.log({"selectedImprovements":selectedImprovements});
        console.log({"comment":comment});

        var list=document.getElementById("errorBox");
        list.innerHTML="<li>No Errors found</li>";
        return true;
    }
    
    var list=document.getElementById("errorBox");
    list.innerHTML="";
    for(let i=0;i<errors.length;i++){
        list.innerHTML+=errors[i];
    }
    return false;
}