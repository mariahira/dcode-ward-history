import { useState } from "react";

const C = {
  bg:       "#F0F4F8",
  surface:  "#FFFFFF",
  card:     "#FFFFFF",
  border:   "#DCE8F0",
  navy:     "#1A3557",
  navyDark: "#0F2236",
  teal:     "#2E8B8B",
  cyan:     "#3AAFCF",
  lime:     "#4CAF7D",
  amber:    "#F5A623",
  rose:     "#D95F7A",
  purple:   "#7B6FCC",
  orange:   "#E07B4A",
  slate:    "#5B7A96",
  text:     "#1E2D3D",
  muted:    "#6B8299",
  lightBg:  "#F7FAFC",
};

const STEPS = [
  {
    id:"pc", code:"PC", emoji:"🩺", color:C.teal, light:"#E8F6F6",
    title:"Presenting Complaint",       title_bn:"প্রধান অভিযোগ",
    subtitle:"Chief reason — in the patient's own words",
    subtitle_bn:"রোগীর নিজের ভাষায় আসার কারণ",
    audio:"Presenting Complaint",
    prompts:[
      {en:"What brings you in today?",                      bn:"আজ কী সমস্যা নিয়ে এসেছেন?"},
      {en:"What is the main problem you are experiencing?", bn:"আপনার প্রধান সমস্যাটি কী?"},
      {en:"How long have you had this problem?",            bn:"কতদিন ধরে এই সমস্যা?"},
    ],
    tip:{en:"Use open-ended questions. Let the patient speak first without interrupting.",
         bn:"উন্মুক্ত প্রশ্ন করুন। রোগীকে প্রথমে কথা বলতে দিন।"},
    mnemonics:[],
    practice:[
      {scenario:"A 45-year-old man walks in holding his chest.", answer:"Start with: 'What brings you in today?' — let him describe in his own words before asking specifics."},
      {scenario:"An elderly woman says 'I don't feel well.'",    answer:"Ask: 'Can you tell me more about what you're feeling?' — avoid yes/no questions at this stage."},
    ],
  },
  {
    id:"hpc", code:"HPC", emoji:"🔬", color:C.cyan, light:"#EAF6FB",
    title:"History of Presenting Complaint", title_bn:"বর্তমান অভিযোগের ইতিহাস",
    subtitle:"Deep-dive using SOCRATES framework",
    subtitle_bn:"SOCRATES পদ্ধতিতে বিশ্লেষণ",
    audio:"History of Presenting Complaint",
    prompts:[
      {en:"When exactly did it start?",            bn:"এটা ঠিক কখন শুরু হয়েছিল?"},
      {en:"Did it come on suddenly or gradually?", bn:"হঠাৎ নাকি আস্তে আস্তে?"},
      {en:"What makes it better or worse?",        bn:"কিসে ভালো বা খারাপ হয়?"},
      {en:"Rate severity 1–10.",                   bn:"১ থেকে ১০ এ কতটুকু?"},
    ],
    tip:{en:"Always ask about associated symptoms — never stop at the chief complaint.",
         bn:"সংশ্লিষ্ট উপসর্গ সম্পর্কে সবসময় জিজ্ঞেস করুন।"},
    mnemonics:[
      {name:"SOCRATES", items:["Site","Onset","Character","Radiation","Associations","Time course","Exacerbating / Relieving","Severity"]},
    ],
    practice:[
      {scenario:"Patient says: 'I have chest pain.'",  answer:"Use SOCRATES — Site? Onset? Character? (Sharp/dull?) Radiation to arm/jaw? Associated symptoms? Duration? What makes it worse?"},
      {scenario:"Patient says: 'I have a headache.'",  answer:"Ask: How long? Where exactly? Throbbing or pressure? Does light bother you? Any nausea? Neck stiffness?"},
    ],
  },
  {
    id:"pmh", code:"PMH", emoji:"📋", color:C.lime, light:"#EAF6EF",
    title:"Past Medical History",       title_bn:"পূর্ববর্তী চিকিৎসা ইতিহাস",
    subtitle:"Previous illnesses, surgeries, hospitalizations",
    subtitle_bn:"আগের রোগ, অপারেশন ও হাসপাতাল ভর্তি",
    audio:"Past Medical History",
    prompts:[
      {en:"Any known medical conditions?",       bn:"পরিচিত কোনো রোগ আছে?"},
      {en:"Ever been admitted to hospital?",     bn:"কখনো হাসপাতালে ভর্তি হয়েছেন?"},
      {en:"Any previous operations?",           bn:"কোনো অপারেশন হয়েছে?"},
    ],
    tip:{en:"Ask specifically about DM, HTN, TB, Asthma — patients often forget chronic conditions.",
         bn:"ডায়াবেটিস, উচ্চ রক্তচাপ, যক্ষ্মা সরাসরি জিজ্ঞেস করুন।"},
    mnemonics:[
      {name:"MJ THREADS", items:["MI","Jaundice","TB","HTN","Rheumatic fever","Epilepsy","Asthma","Diabetes","Stroke"]},
    ],
    practice:[
      {scenario:"Patient denies any past illnesses.", answer:"Probe specifically: 'Any blood pressure issues? Diabetes? TB or jaundice?' Direct questions unlock forgotten history."},
    ],
  },
  {
    id:"dh", code:"DH", emoji:"💊", color:C.purple, light:"#F0EEF9",
    title:"Drug History & Allergies",   title_bn:"ওষুধের ইতিহাস ও অ্যালার্জি",
    subtitle:"Medications, OTC drugs, supplements & allergies",
    subtitle_bn:"ওষুধ, ভিটামিন, সাপ্লিমেন্ট এবং অ্যালার্জি",
    audio:"Drug History and Allergies",
    prompts:[
      {en:"Any current medications including OTC?", bn:"বর্তমানে কোনো ওষুধ খাচ্ছেন?"},
      {en:"Any herbal or traditional remedies?",    bn:"ভেষজ বা দেশীয় ওষুধ খাচ্ছেন?"},
      {en:"Any known allergies? What happens?",     bn:"অ্যালার্জি আছে? কী হয় তখন?"},
    ],
    tip:{en:"Distinguish true allergy from side effect. Note dose, frequency, and compliance.",
         bn:"অ্যালার্জি ও পার্শ্বপ্রতিক্রিয়ার পার্থক্য করুন।"},
    mnemonics:[],
    practice:[
      {scenario:"Patient says 'I'm allergic to penicillin.'", answer:"Ask: 'What exactly happens when you take it?' Distinguish rash/anaphylaxis (true allergy) from GI upset (intolerance)."},
    ],
  },
  {
    id:"fh", code:"FH", emoji:"👨‍👩‍👧", color:C.amber, light:"#FEF6E4",
    title:"Family History",             title_bn:"পারিবারিক ইতিহাস",
    subtitle:"Hereditary conditions in close relatives",
    subtitle_bn:"নিকটাত্মীয়দের বংশগত রোগের ইতিহাস",
    audio:"Family History",
    prompts:[
      {en:"Any conditions run in your family?",          bn:"পরিবারে কোনো রোগ আছে?"},
      {en:"Are your parents alive? Cause of death?",     bn:"বাবা-মা বেঁচে আছেন? মৃত্যুর কারণ?"},
      {en:"Family history of DM, heart disease, cancer?",bn:"পরিবারে ডায়াবেটিস, হৃদরোগ, ক্যান্সার?"},
    ],
    tip:{en:"Focus on first-degree relatives: parents, siblings, children.",
         bn:"প্রথম-স্তরের আত্মীয়: বাবা-মা, ভাই-বোন, সন্তান।"},
    mnemonics:[],
    practice:[
      {scenario:"Young patient with chest pain, father died at 50.", answer:"Explore family cardiac history — premature CAD is hereditary. Ask about cholesterol, sudden deaths in family."},
    ],
  },
  {
    id:"sh", code:"SH", emoji:"🏙️", color:C.orange, light:"#FDF0E8",
    title:"Social History",             title_bn:"সামাজিক ইতিহাস",
    subtitle:"Occupation, lifestyle, habits & support system",
    subtitle_bn:"পেশা, জীবনযাত্রা, অভ্যাস ও সামাজিক সহায়তা",
    audio:"Social History",
    prompts:[
      {en:"What is your occupation?",                  bn:"আপনার পেশা কী?"},
      {en:"Do you smoke or use tobacco?",              bn:"ধূমপান বা তামাক সেবন করেন?"},
      {en:"Do you drink alcohol? How much per week?",  bn:"মদ্যপান করেন? সপ্তাহে কতটুকু?"},
      {en:"Who lives with you at home?",               bn:"বাড়িতে কারা থাকেন?"},
    ],
    tip:{en:"Be non-judgmental. Ask 'How much per week?' not 'Do you drink a lot?'",
         bn:"বিচার না করে জিজ্ঞেস করুন। 'কতটুকু?' জিজ্ঞেস করুন।"},
    mnemonics:[
      {name:"SADMA", items:["Smoking","Alcohol","Drugs","Marital status","Activity / Occupation"]},
    ],
    practice:[
      {scenario:"Patient seems reluctant to discuss habits.", answer:"Normalize it: 'Many of my patients smoke or drink — I ask everyone so I can give the best care.' Non-judgmental tone opens doors."},
    ],
  },
  {
    id:"ros", code:"ROS", emoji:"⚕️", color:C.rose, light:"#FAEAEE",
    title:"Review of Systems",          title_bn:"সিস্টেম রিভিউ",
    subtitle:"Systematic screening of all body systems",
    subtitle_bn:"সমস্ত অঙ্গতন্ত্রের পদ্ধতিগত পর্যালোচনা",
    audio:"Review of Systems",
    prompts:[
      {en:"Any headaches, dizziness, or vision changes?", bn:"মাথাব্যথা, মাথা ঘোরা বা দৃষ্টি পরিবর্তন?"},
      {en:"Any chest pain or shortness of breath?",       bn:"বুকে ব্যথা বা শ্বাসকষ্ট?"},
      {en:"Any nausea, vomiting, or bowel changes?",      bn:"বমি ভাব, বমি বা পেটের সমস্যা?"},
      {en:"Any urinary symptoms?",                        bn:"প্রস্রাবের কোনো সমস্যা?"},
    ],
    tip:{en:"Screen by system — only drill deeper if positive. Don't ask everything at once.",
         bn:"প্রতিটি সিস্টেম স্ক্রিন করুন — পজিটিভ হলেই বিস্তারিত জিজ্ঞেস করুন।"},
    mnemonics:[],
    practice:[
      {scenario:"You've completed HPC for abdominal pain.", answer:"Now screen other systems: chest pain? (cardiac ref.) urinary symptoms? (UTI/renal?) fever/rigors? Systematic screening catches what focused history misses."},
    ],
  },
];

const INIT_IDEAS = [
  {id:1,author:"Rafiq · DMCH",       step:"HPC",text:"রোগীকে শরীরের ছবিতে আঙুল দিয়ে ব্যথার জায়গা দেখাতে বলুন।",             en:"Ask patient to point on a body diagram — faster than verbal description.",likes:18},
  {id:2,author:"Priya · Chittagong", step:"SH", text:"'সপ্তাহে কতটা?' জিজ্ঞেস করুন — সরাসরি 'বেশি খান?' নয়।",             en:"Ask 'How much per week?' not 'Do you drink a lot?' — more honest answers.",likes:25},
  {id:3,author:"Lin · BIRDEM",       step:"PMH",text:"'এই সমস্যা বাদে স্বাস্থ্য কেমন?' দিয়ে PMH শুরু করলে রোগী বেশি খোলে।",en:"Start PMH with 'Apart from this, how is your general health?' — opens up patients.",likes:12},
];

function speak(text){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="en-US"; u.rate=0.87; u.pitch=1.05;
  window.speechSynthesis.speak(u);
}

function PrintSheet({onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",borderRadius:18,maxWidth:740,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 22px",background:C.navy,borderRadius:"18px 18px 0 0"}}>
          <span style={{color:"#fff",fontFamily:"monospace",fontWeight:"bold",fontSize:15}}>⚕️ Dcode Ward History · Cheat Sheet</span>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:13}}>✕ Close</button>
        </div>
        <div style={{padding:26}}>
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:22,fontWeight:"bold",color:C.navy,fontFamily:"Georgia,serif"}}>⚕️ Dcode Ward History</div>
            <div style={{fontSize:11,color:"#888",marginTop:3}}>Patient History-Taking · Ward Quick Reference · EN + বাংলা</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {STEPS.map(s=>(
              <div key={s.id} style={{border:`2px solid ${s.color}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{background:s.color,padding:"8px 13px",display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:16}}>{s.emoji}</span>
                  <div>
                    <div style={{color:"#fff",fontWeight:"bold",fontSize:12}}>{s.code} — {s.title}</div>
                    <div style={{color:"rgba(255,255,255,.85)",fontSize:9}}>{s.title_bn}</div>
                  </div>
                </div>
                <div style={{padding:"10px 13px",background:"#fafafa"}}>
                  {s.prompts.slice(0,3).map((p,i)=>(
                    <div key={i} style={{borderLeft:`3px solid ${s.color}`,paddingLeft:7,marginBottom:5}}>
                      <div style={{fontSize:10,color:"#222",lineHeight:1.4}}>{p.en}</div>
                      <div style={{fontSize:9,color:"#777"}}>{p.bn}</div>
                    </div>
                  ))}
                  {s.mnemonics.map(m=>(
                    <div key={m.name} style={{marginTop:7,background:s.color+"18",borderRadius:6,padding:"5px 9px"}}>
                      <div style={{fontSize:9,fontWeight:"bold",color:s.color,marginBottom:3}}>🧠 {m.name}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                        {m.items.map((it,j)=>(
                          <span key={j} style={{background:s.color,color:"#fff",borderRadius:4,padding:"1px 6px",fontSize:8}}><b>{it[0]}</b>{it.slice(1)}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:6,fontSize:9,color:"#555",fontStyle:"italic",borderTop:"1px dashed #e0e0e0",paddingTop:5}}>💡 {s.tip.en}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14,textAlign:"center",fontSize:9,color:"#aaa",borderTop:"1px solid #eee",paddingTop:10}}>
            Dcode Ward History · Created by Maria Sultana Hira · Always verify with your clinical supervisor
          
          </div>
        </div>
        <div style={{padding:"13px 22px",borderTop:"1px solid #eee",display:"flex",gap:10,justifyContent:"flex-end",background:"#f9f9f9",borderRadius:"0 0 18px 18px"}}>
          <button onClick={()=>window.print()} style={{padding:"10px 28px",background:C.teal,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontWeight:"bold",fontSize:14}}>🖨 Print / Save PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function DcodeWardHistory(){
  const [tab,setTab]             = useState("guide");
  const [stepIdx,setStepIdx]     = useState(0);
  const [lang,setLang]           = useState("both");
  const [mnemOpen,setMnemOpen]   = useState(null);
  const [ideas,setIdeas]         = useState(INIT_IDEAS);
  const [liked,setLiked]         = useState([]);
  const [newIdea,setNewIdea]     = useState({step:"HPC",text:"",en:""});
  const [notes,setNotes]         = useState({});
  const [showPrint,setShowPrint] = useState(false);
  const [speaking,setSpeaking]   = useState(false);
  const [toast,setToast]         = useState("");
  const [copied,setCopied]       = useState(false);
  const [loggedIn,setLoggedIn]   = useState(false);
  const [loginView,setLoginView] = useState("login");
  const [form,setForm]           = useState({name:"",email:"",password:""});
  const [formErr,setFormErr]     = useState("");
  const [user,setUser]           = useState(null);
  const [practiceIdx,setPracticeIdx] = useState(0);
  const [showAnswer,setShowAnswer]   = useState(false);
  const [score,setScore]             = useState({correct:0,total:0});

  const S = STEPS[stepIdx];
  const allPractice = STEPS.flatMap(s=>s.practice.map(p=>({...p,code:s.code,color:s.color,emoji:s.emoji,light:s.light})));
  const curP = allPractice[practiceIdx % allPractice.length];

  const showToast = (msg)=>{ setToast(msg); setTimeout(()=>setToast(""),2200); };

  const handleSpeak = (text)=>{ setSpeaking(true); speak(text); setTimeout(()=>setSpeaking(false),2000); };

  const handleLike = (id)=>{
    if(liked.includes(id)){ setLiked(p=>p.filter(x=>x!==id)); setIdeas(p=>p.map(i=>i.id===id?{...i,likes:i.likes-1}:i)); }
    else { setLiked(p=>[...p,id]); setIdeas(p=>p.map(i=>i.id===id?{...i,likes:i.likes+1}:i)); }
  };

  const handlePost = ()=>{
    if(!newIdea.text.trim()) return;
    setIdeas(p=>[{id:Date.now(),author:user?`${user.name} (You)`:"আপনি (You)",step:newIdea.step,text:newIdea.text,en:newIdea.en,likes:0},...p]);
    setNewIdea(p=>({...p,text:"",en:""}));
    showToast("✅ Posted!");
  };

  const exportNotes = ()=>{
    const txt=STEPS.map(s=>`## ${s.title}\n${notes[s.id]||"(empty)"}`).join("\n\n");
    navigator.clipboard.writeText(txt);
    setCopied(true); setTimeout(()=>setCopied(false),2200);
    showToast("📋 Notes copied!");
  };

  const handleLogin = ()=>{
    if(!form.email||!form.password){ setFormErr("Please fill all fields."); return; }
    const name = form.name || form.email.split("@")[0];
    setUser({name, email:form.email});
    setLoggedIn(true); setFormErr("");
    showToast(`👋 Welcome, ${name}!`);
    setTab("guide");
  };

  const markCorrect = ()=>{ setScore(p=>({correct:p.correct+1,total:p.total+1})); setShowAnswer(false); setPracticeIdx(i=>i+1); };
  const markWrong   = ()=>{ setScore(p=>({...p,total:p.total+1}));               setShowAnswer(false); setPracticeIdx(i=>i+1); };

  const inputStyle = {
    width:"100%", padding:"11px 14px", background:C.bg,
    border:`1.5px solid ${C.border}`, borderRadius:10,
    color:C.text, fontSize:14, fontFamily:"Georgia,serif",
    marginBottom:12, boxSizing:"border-box",
  };

  return(
    <div style={{fontFamily:"'Georgia',serif",background:C.bg,minHeight:"100vh",color:C.text}}>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:C.navy,color:"#fff",border:`1px solid ${C.teal}`,padding:"10px 26px",borderRadius:30,zIndex:3000,fontFamily:"monospace",fontSize:13,boxShadow:"0 6px 24px rgba(0,0,0,.15)",whiteSpace:"nowrap"}}>{toast}</div>}

      {showPrint&&<PrintSheet onClose={()=>setShowPrint(false)}/>}

      {/* ── HEADER ── */}
      <header style={{background:`linear-gradient(135deg,${C.navy} 0%,#1E4976 100%)`,padding:"16px 20px 12px",boxShadow:"0 4px 20px rgba(26,53,87,.25)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            {/* Logo */}
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{background:"rgba(255,255,255,.15)",border:"2px solid rgba(255,255,255,.25)",borderRadius:14,padding:"8px 12px",fontSize:24}}>⚕️</div>
              <div>
                <div style={{fontSize:19,fontWeight:"bold",fontFamily:"'Courier New',monospace",color:"#fff",letterSpacing:.5}}>Dcode Ward History</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.6)",fontFamily:"monospace",letterSpacing:.5}}>ডিকোড ওয়ার্ড হিস্ট্রি · BD & International</div>
              </div>
            </div>
            {/* Controls */}
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{display:"flex",background:"rgba(255,255,255,.1)",borderRadius:20,padding:3,gap:2}}>
                {[["both","EN+বাং"],["en","EN"],["bn","বাং"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setLang(v)} style={{padding:"4px 12px",borderRadius:16,border:"none",cursor:"pointer",fontSize:11,fontWeight:"bold",background:lang===v?"#fff":"transparent",color:lang===v?C.navy:"rgba(255,255,255,.75)",transition:"all .2s"}}>{l}</button>
                ))}
              </div>
              <button onClick={()=>setShowPrint(true)} style={{padding:"6px 14px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",borderRadius:20,cursor:"pointer",fontSize:12,fontFamily:"monospace"}}>🖨 Print</button>
              {loggedIn
                ? <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:20,padding:"5px 14px"}}>
                    <span>👤</span>
                    <span style={{fontSize:12,color:"#fff",fontFamily:"monospace"}}>{user?.name}</span>
                    <button onClick={()=>{setLoggedIn(false);setUser(null);}} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",cursor:"pointer",fontSize:11,fontFamily:"monospace"}}>out</button>
                  </div>
                : <button onClick={()=>setTab("login")} style={{padding:"6px 18px",background:"rgba(255,255,255,.95)",border:"none",color:C.navy,borderRadius:20,cursor:"pointer",fontSize:12,fontFamily:"monospace",fontWeight:"bold"}}>🔐 Login</button>
              }
            </div>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",gap:6,marginTop:13,flexWrap:"wrap"}}>
            {[["guide","📖 Guide"],["practice","🏋️ Practice"],["community","💬 Community"],["notepad","📝 Notepad"]].map(([t,l])=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 18px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontFamily:"monospace",background:tab===t?"#fff":"rgba(255,255,255,.12)",color:tab===t?C.navy:"rgba(255,255,255,.8)",fontWeight:tab===t?"bold":"normal",transition:"all .2s"}}>{l}</button>
            ))}
          </div>
        </div>
      </header>

      <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px 50px"}}>

        {/* ══ LOGIN ══ */}
        {tab==="login"&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"58vh"}}>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:36,width:"100%",maxWidth:420,boxShadow:"0 8px 40px rgba(26,53,87,.12)"}}>
              <div style={{textAlign:"center",marginBottom:26}}>
                <div style={{fontSize:40,marginBottom:8}}>🔐</div>
                <div style={{fontSize:20,fontWeight:"bold",fontFamily:"monospace",color:C.navy}}>{loginView==="login"?"Welcome Back":"Create Account"}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:4}}>Save your notes across sessions</div>
              </div>
              {formErr&&<div style={{background:"#FEE8ED",border:"1px solid #F8B4C2",color:C.rose,borderRadius:8,padding:"8px 14px",fontSize:12,marginBottom:14,textAlign:"center"}}>{formErr}</div>}
              {loginView==="signup"&&<input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Your name" style={inputStyle}/>}
              <input value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email address" type="email" style={inputStyle}/>
              <input value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="Password" type="password" style={{...inputStyle,marginBottom:22}}/>
              <button onClick={handleLogin} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${C.navy},#1E4976)`,border:"none",borderRadius:12,color:"#fff",fontWeight:"bold",fontSize:15,cursor:"pointer",fontFamily:"monospace",boxShadow:"0 4px 18px rgba(26,53,87,.25)"}}>
                {loginView==="login"?"🔐 Login":"🚀 Create Account"}
              </button>
              <div style={{textAlign:"center",marginTop:16,fontSize:13,color:C.muted}}>
                {loginView==="login"?"Don't have an account? ":"Already have an account? "}
                <button onClick={()=>{setLoginView(loginView==="login"?"signup":"login");setFormErr("");}} style={{background:"none",border:"none",color:C.teal,cursor:"pointer",fontSize:13,fontFamily:"monospace",textDecoration:"underline"}}>
                  {loginView==="login"?"Sign Up":"Login"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ GUIDE ══ */}
        {tab==="guide"&&(
          <>
            {/* Progress */}
            <div style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"monospace",color:C.muted,marginBottom:6}}>
                <span>STEP {stepIdx+1} / {STEPS.length}</span>
                <span style={{color:S.color,fontWeight:"bold"}}>{Math.round(((stepIdx+1)/STEPS.length)*100)}%</span>
              </div>
              <div style={{height:7,background:C.border,borderRadius:10,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${((stepIdx+1)/STEPS.length)*100}%`,background:`linear-gradient(90deg,${S.color},${S.color}bb)`,borderRadius:10,transition:"width .4s"}}/>
              </div>
            </div>

            {/* Pills */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
              {STEPS.map((s,i)=>(
                <button key={s.id} onClick={()=>{setStepIdx(i);setMnemOpen(null);}} style={{padding:"6px 16px",borderRadius:20,border:`2px solid ${i===stepIdx?s.color:C.border}`,background:i===stepIdx?s.color:"#fff",color:i===stepIdx?"#fff":C.muted,cursor:"pointer",fontSize:12,fontWeight:"bold",fontFamily:"monospace",transition:"all .2s",boxShadow:i===stepIdx?`0 3px 12px ${s.color}44`:"none"}}>{s.code}</button>
              ))}
            </div>

            {/* Main card */}
            <div style={{background:C.card,borderRadius:20,boxShadow:"0 6px 30px rgba(26,53,87,.1)",overflow:"hidden",marginBottom:18,border:`1px solid ${C.border}`}}>
              <div style={{background:`linear-gradient(135deg,${S.color},${S.color}bb)`,padding:"22px 26px"}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <div style={{background:"rgba(255,255,255,.2)",border:"2px solid rgba(255,255,255,.3)",borderRadius:16,padding:"10px 14px",fontSize:28}}>{S.emoji}</div>
                    <div>
                      <div style={{fontSize:10,fontFamily:"monospace",color:"rgba(255,255,255,.8)",letterSpacing:3,marginBottom:3}}>{S.code}</div>
                      <div style={{fontSize:20,fontWeight:"bold",color:"#fff"}}>{S.title}</div>
                      {(lang==="both"||lang==="bn")&&<div style={{fontSize:13,color:"rgba(255,255,255,.85)",marginTop:2}}>{S.title_bn}</div>}
                    </div>
                  </div>
                  <button onClick={()=>handleSpeak(S.audio)} style={{display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,.2)",border:"1.5px solid rgba(255,255,255,.4)",color:"#fff",borderRadius:12,padding:"8px 14px",cursor:"pointer",flexShrink:0}}>
                    <span style={{fontSize:18}}>{speaking?"🔊":"🔉"}</span>
                    <span style={{fontSize:10,fontFamily:"monospace",letterSpacing:1}}>PRONOUNCE</span>
                  </button>
                </div>
                <p style={{margin:"12px 0 0",fontSize:14,lineHeight:1.7,color:"rgba(255,255,255,.9)"}}>
                  {(lang==="en"||lang==="both")&&S.subtitle}
                  {lang==="both"&&" · "}
                  {(lang==="bn"||lang==="both")&&<span style={{opacity:.85}}>{S.subtitle_bn}</span>}
                </p>
              </div>

              <div style={{padding:26}}>
                {/* Questions */}
                <div style={{marginBottom:22}}>
                  <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,letterSpacing:3,marginBottom:12,textTransform:"uppercase"}}>🎙 Key Questions</div>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {S.prompts.map((q,i)=>(
                      <div key={i} style={{display:"flex",gap:12,padding:"12px 16px",background:S.light,borderRadius:12,borderLeft:`4px solid ${S.color}`,alignItems:"flex-start"}}>
                        <span style={{background:S.color,color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:"bold",flexShrink:0,marginTop:2}}>{i+1}</span>
                        <div style={{flex:1}}>
                          {(lang==="en"||lang==="both")&&<div style={{fontSize:14,fontStyle:"italic",color:C.text,lineHeight:1.5}}>"{q.en}"</div>}
                          {(lang==="bn"||lang==="both")&&<div style={{fontSize:13,color:S.color,marginTop:lang==="both"?3:0,lineHeight:1.5}}>"{q.bn}"</div>}
                        </div>
                        <button onClick={()=>handleSpeak(q.en)} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,flexShrink:0,opacity:.5}} title="Listen">🔊</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                <div style={{background:"#FFFBF0",border:"1px solid #F5D87A",borderRadius:12,padding:"14px 18px",marginBottom:S.mnemonics.length?20:0}}>
                  <div style={{fontFamily:"monospace",fontSize:10,color:"#B7841A",letterSpacing:3,marginBottom:6}}>💡 CLINICAL TIP</div>
                  {(lang==="en"||lang==="both")&&<p style={{margin:0,fontSize:14,color:"#5C4A00",lineHeight:1.7}}>{S.tip.en}</p>}
                  {(lang==="bn"||lang==="both")&&<p style={{margin:lang==="both"?"6px 0 0":0,fontSize:13,color:"#7A6010",lineHeight:1.7}}>{S.tip.bn}</p>}
                </div>

                {/* Mnemonics */}
                {S.mnemonics.map(m=>(
                  <div key={m.name} style={{marginTop:18}}>
                    <button onClick={()=>setMnemOpen(mnemOpen===m.name?null:m.name)} style={{display:"flex",alignItems:"center",gap:10,background:S.light,border:`2px solid ${S.color}44`,borderRadius:12,padding:"11px 18px",cursor:"pointer",width:"100%",textAlign:"left"}}>
                      <span style={{fontSize:18}}>🧠</span>
                      <span style={{fontFamily:"monospace",fontWeight:"bold",color:S.color,letterSpacing:1}}>MNEMONIC: {m.name}</span>
                      <span style={{marginLeft:"auto",color:S.color,fontSize:12}}>{mnemOpen===m.name?"▲ Hide":"▼ Reveal"}</span>
                    </button>
                    {mnemOpen===m.name&&(
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))",gap:10,marginTop:12}}>
                        {m.items.map((it,j)=>(
                          <button key={j} onClick={()=>handleSpeak(it)} style={{background:S.light,border:`1.5px solid ${S.color}44`,borderRadius:12,padding:"12px 10px",textAlign:"center",cursor:"pointer",transition:"all .15s"}}>
                            <div style={{fontFamily:"monospace",fontSize:22,fontWeight:"bold",color:S.color}}>{it[0]}</div>
                            <div style={{fontSize:11,color:C.muted,marginTop:3}}>{it}</div>
                            <div style={{fontSize:10,color:S.color,marginTop:4,opacity:.7}}>🔊 tap</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div style={{display:"flex",gap:12,justifyContent:"space-between"}}>
              <button onClick={()=>{setStepIdx(Math.max(0,stepIdx-1));setMnemOpen(null);}} disabled={stepIdx===0} style={{padding:"11px 22px",borderRadius:12,border:`2px solid ${C.border}`,background:"#fff",color:stepIdx===0?C.border:C.text,cursor:stepIdx===0?"not-allowed":"pointer",fontFamily:"monospace",fontWeight:"bold",fontSize:13}}>← Back</button>
              <button onClick={()=>{setStepIdx(Math.min(STEPS.length-1,stepIdx+1));setMnemOpen(null);}} disabled={stepIdx===STEPS.length-1} style={{padding:"11px 28px",borderRadius:12,border:"none",background:stepIdx===STEPS.length-1?"#ccc":`linear-gradient(135deg,${S.color},${S.color}bb)`,color:"#fff",cursor:stepIdx===STEPS.length-1?"not-allowed":"pointer",fontFamily:"monospace",fontWeight:"bold",fontSize:13,boxShadow:stepIdx===STEPS.length-1?"none":`0 4px 14px ${S.color}44`}}>Next Step →</button>
            </div>

            {/* Flow map */}
            <div style={{marginTop:28,background:C.card,borderRadius:16,padding:"18px 20px",boxShadow:"0 4px 18px rgba(26,53,87,.07)",border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,letterSpacing:3,marginBottom:14,textTransform:"uppercase"}}>📍 Full History Flow</div>
              <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:6}}>
                {STEPS.map((s,i)=>(
                  <div key={s.id} style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>{setStepIdx(i);setMnemOpen(null);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:i===stepIdx?s.color:C.lightBg,border:`2px solid ${i===stepIdx?s.color:C.border}`,borderRadius:12,padding:"10px 12px",cursor:"pointer",minWidth:58,transition:"all .2s",boxShadow:i===stepIdx?`0 3px 12px ${s.color}44`:"none"}}>
                      <span style={{fontSize:18}}>{s.emoji}</span>
                      <span style={{fontFamily:"monospace",fontSize:10,fontWeight:"bold",color:i===stepIdx?"#fff":s.color}}>{s.code}</span>
                    </button>
                    {i<STEPS.length-1&&<div style={{width:14,height:2,background:C.border,flexShrink:0}}/>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══ PRACTICE ══ */}
        {tab==="practice"&&(
          <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
              <div>
                <h2 style={{fontFamily:"monospace",color:C.navy,margin:0,fontSize:15,letterSpacing:2,textTransform:"uppercase"}}>🏋️ Practice Mode</h2>
                <p style={{color:C.muted,fontSize:12,margin:"4px 0 0",fontFamily:"monospace"}}>Real ward scenarios — think before you reveal</p>
              </div>
              <div style={{background:C.card,border:`2px solid ${C.lime}`,borderRadius:14,padding:"8px 20px",textAlign:"center",boxShadow:"0 3px 12px rgba(76,175,125,.15)"}}>
                <div style={{fontFamily:"monospace",fontSize:10,color:C.muted}}>SCORE</div>
                <div style={{fontFamily:"monospace",fontSize:22,fontWeight:"bold",color:C.lime}}>{score.correct}/{score.total}</div>
              </div>
            </div>

            <div style={{background:C.card,borderRadius:20,border:`2px solid ${curP.color}33`,boxShadow:"0 6px 24px rgba(26,53,87,.1)",overflow:"hidden",marginBottom:20}}>
              <div style={{background:curP.light,borderBottom:`2px solid ${curP.color}22`,padding:"14px 22px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:20}}>{curP.emoji}</span>
                <span style={{fontFamily:"monospace",fontWeight:"bold",color:curP.color,letterSpacing:1}}>{curP.code}</span>
                <span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>CASE #{(practiceIdx%allPractice.length)+1} of {allPractice.length}</span>
              </div>
              <div style={{padding:26}}>
                <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,letterSpacing:3,marginBottom:10}}>📋 SCENARIO</div>
                <p style={{fontSize:17,lineHeight:1.7,color:C.text,background:C.lightBg,borderRadius:12,padding:"16px 20px",border:`1px solid ${C.border}`,margin:"0 0 22px"}}>{curP.scenario}</p>
                {!showAnswer
                  ? <button onClick={()=>setShowAnswer(true)} style={{width:"100%",padding:"14px",background:`linear-gradient(135deg,${curP.color},${curP.color}bb)`,border:"none",borderRadius:12,color:"#fff",fontWeight:"bold",fontSize:14,cursor:"pointer",fontFamily:"monospace",boxShadow:`0 4px 14px ${curP.color}44`}}>💡 Reveal Best Approach</button>
                  : <>
                      <div style={{fontFamily:"monospace",fontSize:10,color:C.lime,letterSpacing:3,marginBottom:10}}>✅ SUGGESTED APPROACH</div>
                      <div style={{background:"#EAF6EF",border:`1.5px solid ${C.lime}`,borderRadius:12,padding:"16px 20px",fontSize:15,lineHeight:1.7,color:"#2D6A4F",marginBottom:20}}>{curP.answer}</div>
                      <div style={{display:"flex",gap:12}}>
                        <button onClick={markCorrect} style={{flex:1,padding:"12px",background:"#EAF6EF",border:`2px solid ${C.lime}`,color:C.lime,borderRadius:12,cursor:"pointer",fontFamily:"monospace",fontWeight:"bold",fontSize:13}}>✅ Got it!</button>
                        <button onClick={markWrong}   style={{flex:1,padding:"12px",background:"#FAEAEE",border:`2px solid ${C.rose}`,color:C.rose,  borderRadius:12,cursor:"pointer",fontFamily:"monospace",fontWeight:"bold",fontSize:13}}>❌ Need more practice</button>
                      </div>
                    </>
                }
              </div>
            </div>

            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:"0 3px 14px rgba(26,53,87,.07)"}}>
              <div style={{padding:"12px 20px",borderBottom:`1px solid ${C.border}`,fontFamily:"monospace",fontSize:11,color:C.muted,letterSpacing:2,background:C.lightBg}}>ALL SCENARIOS ({allPractice.length})</div>
              {allPractice.map((p,i)=>(
                <div key={i} onClick={()=>{setPracticeIdx(i);setShowAnswer(false);}} style={{padding:"12px 20px",borderBottom:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,background:i===practiceIdx%allPractice.length?p.light:"transparent",transition:"background .2s"}}>
                  <span style={{fontSize:15}}>{p.emoji}</span>
                  <span style={{fontFamily:"monospace",fontSize:11,color:p.color,minWidth:36,fontWeight:"bold"}}>{p.code}</span>
                  <span style={{fontSize:13,color:C.muted,flex:1}}>{p.scenario}</span>
                  {i===practiceIdx%allPractice.length&&<span style={{color:p.color,fontSize:12}}>▶</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══ COMMUNITY ══ */}
        {tab==="community"&&(
          <>
            <h2 style={{fontFamily:"monospace",color:C.navy,margin:"0 0 4px",fontSize:15,letterSpacing:2,textTransform:"uppercase"}}>💬 Student Tips</h2>
            <p style={{color:C.muted,fontSize:12,marginBottom:20}}>শিক্ষার্থীদের টিপস শেয়ার করুন · Share your ward tricks</p>
            <div style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,padding:22,marginBottom:22,boxShadow:"0 3px 14px rgba(26,53,87,.07)"}}>
              <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,letterSpacing:2,marginBottom:14,textTransform:"uppercase"}}>✍️ Post Your Idea</div>
              <select value={newIdea.step} onChange={e=>setNewIdea(p=>({...p,step:e.target.value}))} style={{width:"100%",padding:"10px 14px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:13,fontFamily:"monospace",marginBottom:12,boxSizing:"border-box"}}>
                {STEPS.map(s=><option key={s.id} value={s.code}>{s.code} — {s.title}</option>)}
              </select>
              <textarea value={newIdea.text} onChange={e=>setNewIdea(p=>({...p,text:e.target.value}))} placeholder="বাংলায় বা ইংরেজিতে আপনার টিপস লিখুন..." rows={2} style={{width:"100%",padding:"11px 14px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.text,fontSize:14,fontFamily:"Georgia,serif",resize:"vertical",boxSizing:"border-box",marginBottom:10}}/>
              <textarea value={newIdea.en} onChange={e=>setNewIdea(p=>({...p,en:e.target.value}))} placeholder="(Optional) English translation..." rows={2} style={{width:"100%",padding:"11px 14px",background:C.bg,border:`1.5px solid ${C.border}`,borderRadius:10,color:C.muted,fontSize:13,fontFamily:"Georgia,serif",resize:"vertical",boxSizing:"border-box",marginBottom:14}}/>
              <button onClick={handlePost} style={{padding:"10px 24px",background:`linear-gradient(135deg,${C.navy},#1E4976)`,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontFamily:"monospace",fontWeight:"bold",fontSize:13,boxShadow:"0 4px 14px rgba(26,53,87,.2)"}}>POST →</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {ideas.map(idea=>{
                const s=STEPS.find(x=>x.code===idea.step);
                return(
                  <div key={idea.id} style={{background:C.card,borderRadius:14,padding:20,border:`1px solid ${C.border}`,borderLeft:`4px solid ${s?.color||"#999"}`,boxShadow:"0 2px 10px rgba(26,53,87,.06)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
                      <span style={{background:s?.color,color:"#fff",borderRadius:6,padding:"3px 12px",fontFamily:"monospace",fontSize:11,fontWeight:"bold"}}>{idea.step}</span>
                      <span style={{fontFamily:"monospace",fontSize:12,color:C.muted}}>by {idea.author}</span>
                    </div>
                    <p style={{margin:"0 0 6px",fontSize:15,lineHeight:1.7,color:C.text}}>{idea.text}</p>
                    {idea.en&&<p style={{margin:"0 0 12px",fontSize:13,lineHeight:1.6,color:C.muted,fontStyle:"italic"}}>{idea.en}</p>}
                    <button onClick={()=>handleLike(idea.id)} style={{display:"flex",alignItems:"center",gap:6,background:liked.includes(idea.id)?"#FAEAEE":"#F4F8FC",border:`1px solid ${liked.includes(idea.id)?C.rose:C.border}`,borderRadius:20,padding:"5px 14px",cursor:"pointer",color:liked.includes(idea.id)?C.rose:C.muted,fontSize:13,fontFamily:"monospace"}}>
                      {liked.includes(idea.id)?"❤️":"🤍"} {idea.likes}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ══ NOTEPAD ══ */}
        {tab==="notepad"&&(
          <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
              <div>
                <h2 style={{fontFamily:"monospace",color:C.navy,margin:0,fontSize:15,letterSpacing:2,textTransform:"uppercase"}}>📝 Patient Notepad</h2>
                <p style={{color:C.muted,fontSize:12,margin:"4px 0 0",fontFamily:"monospace"}}>{loggedIn?`Saving as ${user?.name} · `:"Login to save across sessions · "}রোগীর নোট</p>
              </div>
              <button onClick={exportNotes} style={{padding:"9px 20px",background:copied?C.lime:C.navy,color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontFamily:"monospace",fontSize:12,fontWeight:"bold",transition:"background .3s",boxShadow:"0 3px 12px rgba(26,53,87,.2)"}}>
                {copied?"✓ Copied!":"⬆ Copy All"}
              </button>
            </div>
            {!loggedIn&&(
              <div style={{background:"#FFFBF0",border:"1px solid #F5D87A",borderRadius:12,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:20}}>🔐</span>
                <div style={{flex:1}}>
                  <div style={{color:"#B7841A",fontFamily:"monospace",fontSize:12,fontWeight:"bold"}}>Login to save notes permanently</div>
                  <div style={{color:C.muted,fontSize:12,marginTop:2}}>Notes currently only last this session</div>
                </div>
                <button onClick={()=>setTab("login")} style={{padding:"7px 16px",background:"#F5A62322",border:`1px solid ${C.amber}`,color:C.amber,borderRadius:10,cursor:"pointer",fontFamily:"monospace",fontSize:12,fontWeight:"bold"}}>Login →</button>
              </div>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {STEPS.map(s=>(
                <div key={s.id} style={{background:C.card,borderRadius:14,overflow:"hidden",border:`1px solid ${C.border}`,boxShadow:"0 2px 10px rgba(26,53,87,.06)"}}>
                  <div style={{background:`linear-gradient(135deg,${s.color},${s.color}bb)`,padding:"10px 18px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:16}}>{s.emoji}</span>
                    <div>
                      <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:13,color:"#fff"}}>{s.code} — {s.title}</span>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.75)"}}>{s.title_bn}</div>
                    </div>
                  </div>
                  <textarea value={notes[s.id]||""} onChange={e=>setNotes(p=>({...p,[s.id]:e.target.value}))} placeholder={`Notes for ${s.title} · ${s.title_bn}...`} rows={3} style={{width:"100%",padding:"13px 18px",border:"none",fontFamily:"Georgia,serif",fontSize:14,lineHeight:1.7,resize:"vertical",boxSizing:"border-box",color:C.text,background:C.lightBg}}/>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer style={{textAlign:"center",padding:"16px",fontFamily:"monospace",fontSize:11,color:C.muted,borderTop:`1px solid ${C.border}`,background:C.surface}}>
        <span style={{color:C.teal,fontWeight:"bold"}}>⚕️ Dcode Ward History</span> · Created by <span style={{color:C.navy,fontWeight:"bold"}}>Maria Sultana Hira</span> · Always verify with your clinical supervisor
      </footer>

      <style>{`
        *{box-sizing:border-box;}
        textarea:focus,select:focus,input:focus{outline:2px solid ${C.teal};outline-offset:1px;}
        button:active{transform:scale(0.97);}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:10px;}
        @media print{header,footer,button{display:none!important;}}
      `}</style>
    </div>
  );
}
