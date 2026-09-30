export const translations = {
  th: {
    title: "แบบสอบถามสุขภาพผู้ป่วย PHQ-9",
    description: "ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านมีอาการต่อไปนี้บ่อยแค่ไหน?",
    questions: [
      "เบื่อ ทำอะไรๆ ก็ไม่เพลิดเพลิน",
      "ไม่สบายใจ ซึมเศร้า หรือท้อแท้",
      "หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากไป",
      "เหนื่อยง่าย หรือไม่ค่อยมีแรง",
      "เบื่ออาหาร หรือกินมากเกินไป",
      "รู้สึกไม่ดีกับตัวเอง – คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเองหรือครอบครัวผิดหวัง",
      "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานที่ต้องใช้ความตั้งใจ",
      "พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่าย จนท่านอยู่ไม่นิ่งเหมือนเคย",
      "คิดทำร้ายตนเอง หรือคิดว่าถ้าตายๆ ไปเสียคงจะดี"
    ],
    options: [
      { value: "0", label: "ไม่เลย" },
      { value: "1", label: "มีบางวัน" },
      { value: "2", label: "มีค่อนข้างบ่อย" },
      { value: "3", label: "มีเกือบทุกวัน" }
    ],
    submit: "รวมคะแนน",
    remaining: (n) => `เหลืออีก ${n} ข้อ`,
    retake: "ทำใหม่",
    clear: "ล้างคำตอบ",
    back: "กลับไปหน้าแรก",
    severity: {
      minimal: "ไม่มี หรือมีภาวะซึมเศร้าเล็กน้อย",
      mild: "ภาวะซึมเศร้าระดับเบา",
      moderate: "ภาวะซึมเศร้าระดับปานกลาง",
      moderately_severe: "ภาวะซึมเศร้าระดับค่อนข้างรุนแรง",
      severe: "ภาวะซึมเศร้าระดับรุนแรง"
    }
  },
  en: {
    title: "PHQ-9 Depression Screening",
    description: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed it? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way"
    ],
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ],
    submit: "Submit Assessment",
    remaining: (n) => `${n} questions remaining`,
    retake: "Retake Assessment",
    clear: "Clear",
    back: "Back",
    severity: {
      minimal: "No or minimal depression",
      mild: "Mild depression",
      moderate: "Moderate depression",
      moderately_severe: "Moderately severe depression",
      severe: "Severe depression"
    }
  },
  my: {
    title: "PHQ-9 ခံစားမှုဆိုင်ရာ စစ်ဆေးမှု",
    description: "နောက်ဆုံး ၂ ပတ်အတွင်း အောက်ပါပြဿနာများကို မည်မျှကြာကြာ ခံစားရသလဲ?",
    questions: [
      "လုပ်ငန်းများတွင် စိတ်ဝင်စားမှု သို့မဟုတ် နှစ်သက်မှု အနည်းငယ်သာရှိခြင်း",
      "အောက်ကျနေခြင်း၊ ခံစားမှုဆိုင်ရာ ပြဿနာ သို့မဟုတ် မျှော်လင့်ချက် မရှိခြင်း",
      "အိပ်ရာဝင်ရန် သို့မဟုတ် အိပ်ပျော်နေရန် ခက်ခဲခြင်း၊ သို့မဟုတ် အလွန်များစွာ အိပ်ခြင်း",
      "မြေပြည့်ဖြစ်နေခြင်း သို့မဟုတ် စွမ်းအင်အနည်းငယ်သာရှိခြင်း",
      "စားလိုမှုဆိုးရွားခြင်း သို့မဟုတ် အလွန်များစွာ စားခြင်း",
      "ကိုယ့်ကိုယ်ကို မကောင်းသော ခံစားချက် — ကိုယ်ပျက်စီးသူဖြစ်သည် သို့မဟုတ် ကိုယ်နှင့် မိသားစုကို ပျက်စီးစေခဲ့သည်ဟု ခံစားခြင်း",
      "အရာများပေါ်တွင် စူးစမ်းရန် ခက်ခဲခြင်း — ဥပမာ သတင်းစာဖတ်ခြင်း သို့မဟုတ် ရုပ်မြင်သံကြား ကြည့်ခြင်း",
      "အခြားသူများ သတိပြုနိုင်လောက်အောင် လှုပ်ရှားမှု သို့မဟုတ် ပြောဆိုမှု နှေးကွေးခြင်း — သို့မဟုတ် ဆန့်ကျင်ဘက်အနေဖြင့် အလွန်များစွာ ရွေ့လျားနေခြင်း",
      "ကိုယ်သေဆုံးသွားရင် ပိုကောင်းမည်ဖြစ်သည် သို့မဟုတ် ကိုယ့်ကိုယ်ကို ထိခိုက်စေမည့် အတွေးများ"
    ],
    options: [
      { value: "0", label: "အလုံးစုံ မဟုတ်ပါ" },
      { value: "1", label: "ရက်အနည်းငယ်" },
      { value: "2", label: "ရက်ပိုင်းကျော်" },
      { value: "3", label: "လူတိုင်းမဟုတ်ပါ" }
    ],
    submit: "စစ်ဆေးမှု ပို့သွားရန်",
    remaining: (n) => `နောက် ${n} မေးခွန်း ကျန်ရှိနေသည်`,
    retake: "ပြန်လည် စစ်ဆေးရန်",
    clear: "အဖြေများဖျက်ရန်",
    switchLang: "English",
    back: "ပထမစာမျက်နှာသို့ ပြန်သွားပါ",
    severity: {
      minimal: "မရှိသလောက် သို့မဟုတ် အနည်းငယ်သာ ခံစားမှုဆိုင်ရာ ပြဿနာ",
      mild: "ပေါ့ပါးသော ခံစားမှုဆိုင်ရာ ပြဿနာ",
      moderate: "အလယ်အလတ် ခံစားမှုဆိုင်ရာ ပြဿနာ",
      moderately_severe: "အလယ်အလတ်မှ အပြင်းထန်သော ခံစားမှုဆိုင်ရာ ပြဿနာ",
      severe: "အပြင်းထန်သော ခံစားမှုဆိုင်ရာ ပြဿနာ"
    }
  },
  km: {
    title: "ការវាយតម្លៃ PHQ-9",
    description: "ក្នុងរយៈពេល ២ សប្តាហ៍ចុងក្រោយនេះ អ្នកមានបញ្ហាខាងក្រោមជាញឹកញាប់ដែរឬទេ?",
    questions: [
      "ការលែងចូលចិត្ត ឬពេញចិត្តនឹងអ្វីៗ",
      "មានអារម្មណ៍ថាបាក់ទឹកចិត្ត សោកសៅ ឬខកខាន",
      "ការគេងពិបាក ឬគេងលំដាប់លំដោយ ឬគេងច្រើនពេក",
      "មានអារម្មណ៍ថាហត់ ឬខ្សោយកម្លាំង",
      "ការបរិភោគអាហារដាច់ ឬបរិភោគច្រើនពេក",
      "មានអារម្មណ៍ថាខ្លួនឯងមិនល្អ — ជាមនុស្សបរាជ័យ ឬធ្វើឱ្យខ្លួនឯង ឬគ្រួសារខកចិត្ត",
      "ការពិបាកផ្តោតអារម្មណ៍លើអ្វីៗ — ដូចជានៅពេលអានទំនាក់ទំនង ឬមើលទូរទស្សន៍",
      "ធ្វើការផ្លាស់ប្តូរយឺត ឬយឺតយ៉ាវ — ដែលអ្នកដទៃអាចមើលឃើញ ឬផ្ទុយទៅវិញ ធ្វើការផ្លាស់ប្តូរច្រើនពេក",
      "គិតថានឹងស្លាប់ ឬគិតពីរបៀបដែលខ្លួនឯងអាចបំផ្លាញខ្លួនឯង"
    ],
    options: [
      { value: "0", label: "មិនមានពេលទេ" },
      { value: "1", label: "ថ្ងៃប៉ុន្មាន" },
      { value: "2", label: "ជាងពាក់កណ្តាលថ្ងៃ" },
      { value: "3", label: "ស្ទើរតែគ្រប់ថ្ងៃ" }
    ],
    submit: "បញ្ជូនការវាយតម្លៃ",
    remaining: (n) => `នៅសល់ ${n} សំណួរ`,
    retake: "ធ្វើការវាយតម្លៃឡើងវិញ",
    clear: "លុបចេញ",
    switchLang: "English",
    back: "ត្រឡប់ទៅទំព័រដំបូង",
    severity: {
      minimal: "គ្មាន ឬមានការធ្លាក់ទឹកចិត្តតិចតួច",
      mild: "អារម្មណ៍កាន់តែធ្ងន់",
      moderate: "អារម្មណ៍មធ្យម",
      moderately_severe: "អារម្មណ៍មធ្យមដល់ធ្ងន់",
      severe: "អារម្មណ៍ធ្ងន់"
    }
  }
};

export const LANGS = ["th", "my", "km", "en"];
