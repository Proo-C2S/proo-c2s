/* ==========================================
   PRO C.2.S - SCRIPT.JS COMPLET (Multi-langue & Pro)
========================================== */

const translations = {
    fr: {
        nav_home: "Accueil",
        nav_clients: "Entreprises",
        nav_jobs: "Offres d'emploi",
        nav_about: "À propos",
        nav_refs: "Références",
        nav_faq: "FAQ",
        nav_contact: "Contact",
        nav_candidate: "Espace Candidat",
        nav_recruit: "Besoin de recruter",
        hero_badge: "Partenaire Recrutement & Intérim",
        hero_title: "Votre partenaire RH pour bâtir vos équipes de demain",
        hero_desc: "Spécialiste du recrutement et du travail temporaire au Maroc depuis 2017. Nous apportons des réponses rapides, flexibles et conformes à tous vos défis RH.",
        hero_btn1: "Vous recrutez ?",
        hero_btn2: "Déposer un CV",
        badge_react: "Réactivité",
        badge_legal: "Conformité légale",
        national_txt: "National",
        badge_reg: "Toutes régions",
        split_client_tag: "Entreprises",
        split_client_title: "Besoins urgents ou pics d'activité ?",
        split_client_desc: "Difficulté à recruter rapidement, complexité juridique ou surcroît temporaire : bénéficiez d'une délégation réactive.",
        split_client_btn: "Estimer mon besoin RH",
        split_cand_tag: "Candidats",
        split_cand_title: "Trouvez votre prochaine mission",
        split_cand_desc: "Intérim et missions dans l'industrie, la logistique, le tertiaire et les services dans tout le Maroc.",
        split_cand_btn: "Consulter les offres",
        marquee_title: "Ils nous accordent leur confiance au quotidien",
        sim_badge: "ESPACE ENTREPRISES",
        sim_title: "Simulateur de délégation RH",
        sim_desc: "Estimez immédiatement la mise à disposition de vos équipes temporaires selon votre secteur et le volume souhaité.",
        sim_label1: "Secteur d'activité :",
        sim_label2: "Nombre de profils recherchés :",
        opt_ind: "Industrie & Production",
        opt_log: "Logistique & Transport",
        opt_btp: "BTP & Construction",
        opt_ter: "Tertiaire & Administratif",
        opt_sante: "Santé & Hygiène",
        sim_garant: "Délégation garantie sous",
        sim_btn: "Demander cette équipe",
        serv_span: "NOS SOLUTIONS RH",
        serv_title: "Des services pensés pour votre croissance",
        serv_desc: "Une offre complète de prestations RH pour répondre avec agilité à tous vos défis opérationnels.",
        s1_title: "Travail Temporaire & Intérim",
        s1_desc: "Délégation rapide de personnel compétent pour gérer vos imprévus, congés et surcroîts d'activité.",
        s2_title: "Recrutement CDI / CDD",
        s2_desc: "Sourcing sur-mesure, tests et sélection rigoureuse pour intégrer durablement vos futurs talents clés.",
        s3_title: "Mise à disposition de personnel",
        s3_desc: "Mise en place d'équipes opérationnelles prêtes à intervenir immédiatement sur vos sites.",
        s4_title: "Gestion Administrative & Paie",
        s4_desc: "Prise en charge intégrale des contrats, déclarations sociales et conformité juridique au Maroc.",
        sect_span: "CHAMPS D'EXPERTISE",
        sect_title: "Nos Secteurs d'Intervention",
        sect_desc: "Cliquez sur un secteur pour découvrir nos solutions sur-mesure et demander une délégation immédiate.",
        sec_ind: "Industrie",
        sec_btp: "BTP & Construction",
        sec_log: "Logistique",
        sec_ter: "Tertiaire",
        sec_it: "Informatique",
        sec_call: "Offshoring / Call Center",
        sec_med: "Santé & Médical",
        sec_clean: "Hygiène & Nettoyage",
        abo_span: "NOTRE HISTOIRE & VALEURS",
        abo_title: "À Propos de PRO C2S",
        abo_desc: "Créée en 2017 à Rabat, PRO C2S s'engage au quotidien pour offrir aux entreprises et aux talents la flexibilité et la sécurité juridique qu'ils méritent.",
        a1_title: "Proximité & Écoute",
        a1_desc: "Un interlocuteur RH dédié qui comprend vos exigences métier et s'adapte à vos urgences sur le terrain.",
        a2_title: "Conformité Rigoureuse",
        a2_desc: "Respect strict de la législation marocaine du travail, traçabilité totale et transparence contractuelle.",
        a3_title: "Agilité Opérationnelle",
        a3_desc: "Capacité à déployer des collaborateurs qualifiés en quelques heures pour répondre à vos surcroîts d'activité.",
        a4_title: "Suivi & Intégration",
        a4_desc: "Accompagnement continu de chaque intérimaire pour garantir une productivité immédiate sur vos sites.",
        st1: "Années d'expérience",
        st2: "Entreprises partenaires",
        st3: "Intérimaires placés / an",
        st4: "Taux de satisfaction",
        job_span: "OPPORTUNITÉS DE CARRIÈRE",
        job_title: "Nos Dernières Missions d'Intérim",
        job_desc: "Filtrez par pôle de compétences et cliquez sur une offre pour postuler en direct.",
        f_all: "Toutes les offres",
        f_trans: "Transport & Logistique",
        f_admin: "Administration & IT",
        f_sante: "Santé & Sport",
        badge_interim: "Intérim",
        badge_recent: "Récent",
        badge_urg: "Urgent",
        btn_apply_card: "Voir détails & Postuler",
        test_span: "TÉMOIGNAGES CLIENTS",
        test_title: "Ce que disent nos partenaires",
        test_desc: "La satisfaction de nos entreprises clientes et de nos candidats est notre plus belle réussite.",
        t1_text: "\"PRO C2S nous a sauvé la mise lors d'un pic d'activité inattendu. Des profils qualifiés et opérationnels délégués en moins de 48h. Un vrai partenaire de confiance !\"",
        t1_auth: "Responsable RH, Secteur Industriel",
        t2_text: "\"Grâce à PRO C2S, j'ai trouvé une mission d'intérim rapidement avec un suivi professionnel et qui respecte toujours les délais de paiement. Je recommande vivement !\"",
        t2_auth: "Intérimaire en Logistique",
        faq_span: "QUESTIONS FRÉQUENTES",
        faq_title: "Tout ce que vous devez savoir",
        faq_desc: "Des réponses claires pour les entreprises et les candidats sur le fonctionnement de PRO C2S.",
        fq1: "Quels sont les délais pour déléguer du personnel intérimaire ?",
        fa1: "Grâce à notre vivier actif et réactif dans tout le Maroc, nous sommes capables de mettre à disposition des profils qualifiés sous un délai moyen de 24h à 48h selon la spécificité des postes.",
        fq2: "Quelle est la conformité juridique des contrats au Maroc ?",
        fa2: "PRO C2S applique rigoureusement le Code du Travail marocain. Nous prenons en charge la totalité des obligations légales : CNSS, contrats, assurances sans aucun risque pour l'entreprise.",
        m_loc: "Lieu:",
        m_prof: "Profil:",
        m_desc_title: "Description du poste & Missions :",
        m_whatsapp: "Postuler via WhatsApp",
        contact_tag: "CONTACT",
        contact_title: "Parlons de votre projet",
        contact_desc: "Contactez-nous pour discuter de vos besoins et demander votre devis gratuit et personnalisé.",
        c_resp: "Contact",
        c_phone: "Téléphone",
        c_mail: "Email",
        c_addr: "Adresse",
        c_addr_val: "Imm. 69, 4ème Étage, Appt 04, Av. Patrice Lumumba, Hassan - Rabat",
        ph_name: "Nom complet",
        ph_mail: "Adresse e-mail",
        ph_phone: "Téléphone",
        ph_msg: "Votre message",
        btn_send: "Envoyer",
        foot_desc: "Société spécialisée en recrutement, intérim et propreté professionnelle créée en 2017. Votre partenaire pour construire vos équipes de demain.",
        foot_nav: "Navigation",
        foot_contact: "Contact",
        toast_msg: "Message envoyé avec succès !"
    },
    en: {
        nav_home: "Home",
        nav_clients: "Companies",
        nav_jobs: "Job Offers",
        nav_about: "About",
        nav_refs: "References",
        nav_faq: "FAQ",
        nav_contact: "Contact",
        nav_candidate: "Candidate Space",
        nav_recruit: "Need to Hire",
        hero_badge: "Recruitment & Temp Partner",
        hero_title: "Your HR partner to build the teams of tomorrow",
        hero_desc: "Specialist in recruitment and temporary work in Morocco since 2017. We provide fast, flexible and compliant solutions for all your HR challenges.",
        hero_btn1: "Hiring?",
        hero_btn2: "Submit CV",
        badge_react: "Reactogenicity",
        badge_legal: "Legal Compliance",
        national_txt: "National",
        badge_reg: "All Regions",
        split_client_tag: "Companies",
        split_client_title: "Urgent needs or activity peaks?",
        split_client_desc: "Difficulty hiring quickly, legal complexity or temporary surplus: benefit from responsive staff delegation.",
        split_client_btn: "Estimate HR need",
        split_cand_tag: "Candidates",
        split_cand_title: "Find your next mission",
        split_cand_desc: "Temp work and missions in industry, logistics, services all over Morocco.",
        split_cand_btn: "View Offers",
        marquee_title: "They trust us every day",
        sim_badge: "COMPANIES SPACE",
        sim_title: "HR Delegation Simulator",
        sim_desc: "Instantly estimate the provision of temporary teams according to your sector and desired volume.",
        sim_label1: "Activity Sector:",
        sim_label2: "Number of profiles requested:",
        opt_ind: "Industry & Production",
        opt_log: "Logistics & Transport",
        opt_btp: "Construction & Civil Eng.",
        opt_ter: "Tertiary & Admin",
        opt_sante: "Health & Hygiene",
        sim_garant: "Delegation guaranteed within",
        sim_btn: "Request this team",
        serv_span: "OUR HR SOLUTIONS",
        serv_title: "Services designed for your growth",
        serv_desc: "A complete offer of HR services to agilely meet all your operational challenges.",
        s1_title: "Temporary Work & Temping",
        s1_desc: "Rapid delegation of skilled staff to handle unforeseen events, leave and activity peaks.",
        s2_title: "Permanent / Fixed-term Recruitment",
        s2_desc: "Custom sourcing, rigorous tests and selection to sustainably integrate your future key talents.",
        s3_title: "Staff Provision",
        s3_desc: "Deployment of operational teams ready to intervene immediately on your sites.",
        s4_title: "Administrative & Payroll Management",
        s4_desc: "Full management of contracts, social declarations and legal compliance in Morocco.",
        sect_span: "FIELDS OF EXPERTISE",
        sect_title: "Our Intervention Sectors",
        sect_desc: "Click on a sector to discover our custom solutions and request immediate delegation.",
        sec_ind: "Industry",
        sec_btp: "Construction",
        sec_log: "Logistics",
        sec_ter: "Tertiary",
        sec_it: "IT Systems",
        sec_call: "Offshoring / Call Center",
        sec_med: "Health & Medical",
        sec_clean: "Hygiene & Cleaning",
        abo_span: "OUR HISTORY & VALUES",
        abo_title: "About PRO C2S",
        abo_desc: "Created in 2017 in Rabat, PRO C2S is committed daily to offering companies and talents flexibility and legal security.",
        a1_title: "Proximity & Listening",
        a1_desc: "A dedicated HR contact who understands your business requirements and adapts to your field emergencies.",
        a2_title: "Strict Compliance",
        a2_desc: "Strict respect for Moroccan labor legislation, full traceability and contractual transparency.",
        a3_title: "Operational Agility",
        a3_desc: "Ability to deploy qualified staff within hours to meet your activity surges.",
        a4_title: "Follow-up & Integration",
        a4_desc: "Continuous support for every temp worker to guarantee immediate productivity on your sites.",
        st1: "Years of Experience",
        st2: "Partner Companies",
        st3: "Temps Placed / Year",
        st4: "Satisfaction Rate",
        job_span: "CAREER OPPORTUNITIES",
        job_title: "Our Latest Temp Missions",
        job_desc: "Filter by skills and click on an offer to apply directly.",
        f_all: "All Offers",
        f_trans: "Transport & Logistics",
        f_admin: "Administration & IT",
        f_sante: "Health & Sport",
        badge_interim: "Temp",
        badge_recent: "Recent",
        badge_urg: "Urgent",
        btn_apply_card: "View details & Apply",
        test_span: "CLIENT TESTIMONIALS",
        test_title: "What our partners say",
        test_desc: "The satisfaction of our client companies and candidates is our greatest success.",
        t1_text: "\"PRO C2S saved us during an unexpected activity peak. Qualified and operational profiles delegated in less than 48h. A true trusted partner!\"",
        t1_auth: "HR Manager, Industrial Sector",
        t2_text: "\"Thanks to PRO C2S, I quickly found a temp mission with professional follow-up and timely payment. Highly recommended!\"",
        t2_auth: "Logistics Temp Worker",
        faq_span: "FREQUENTLY ASKED QUESTIONS",
        faq_title: "Everything you need to know",
        faq_desc: "Clear answers for companies and candidates on how PRO C2S works.",
        fq1: "What are the deadlines for delegating temp staff?",
        fa1: "Thanks to our active and responsive pool throughout Morocco, we can provide qualified profiles within an average of 24h to 48h.",
        fq2: "What is the legal compliance of contracts in Morocco?",
        fa2: "PRO C2S strictly applies Moroccan Labor Law. We handle all legal obligations: CNSS, contracts, insurances with no risk for the company.",
        m_loc: "Location:",
        m_prof: "Profile:",
        m_desc_title: "Job Description & Missions:",
        m_whatsapp: "Apply via WhatsApp",
        contact_tag: "CONTACT",
        contact_title: "Let's talk about your project",
        contact_desc: "Contact us to discuss your needs and request your free custom quote.",
        c_resp: "Contact",
        c_phone: "Phone",
        c_mail: "Email",
        c_addr: "Address",
        c_addr_val: "Bldg 69, 4th Floor, Appt 04, Patrice Lumumba Ave, Hassan - Rabat",
        ph_name: "Full Name",
        ph_mail: "Email Address",
        ph_phone: "Phone",
        ph_msg: "Your Message",
        btn_send: "Send",
        foot_desc: "Company specialized in recruitment, temp work and professional cleaning created in 2017. Your partner to build tomorrow's teams.",
        foot_nav: "Navigation",
        foot_contact: "Contact",
        toast_msg: "Message sent successfully!"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_clients: "الشركات",
        nav_jobs: "عروض العمل",
        nav_about: "من نحن",
        nav_refs: "مراجعنا",
        nav_faq: "الأسئلة الشائعة",
        nav_contact: "اتصل بنا",
        nav_candidate: "فضاء المرشحين",
        nav_recruit: "هل تحتاج للتوظيف؟",
        hero_badge: "شريك التوظيف والعمل المؤقت",
        hero_title: "شريكك في الموارد البشرية لبناء فرق المستقبل",
        hero_desc: "متخصصون في التوظيف والعمل المؤقت في المغرب منذ عام 2017. نقدم استجابات سريعة ومرنة ومتوافقة مع جميع تحديات الموارد البشرية لديك.",
        hero_btn1: "هل توظف؟",
        hero_btn2: "إرسال السيرة الذاتية",
        badge_react: "استجابة سريعة",
        badge_legal: "امتثال قانوني",
        national_txt: "وطني",
        badge_reg: "جميع الجهات",
        split_client_tag: "الشركات",
        split_client_title: "احتياجات عاجلة أو ذروة العمل؟",
        split_client_desc: "صعوبة التوظيف السريع، التعقيد القانوني أو الفائض المؤقت: استفد من تفويض سريع وموثوق.",
        split_client_btn: "تقدير احتياجات الموارد البشرية",
        split_cand_tag: "المرشحون",
        split_cand_title: "ابحث عن مهمتك القادمة",
        split_cand_desc: "العمل المؤقت والمهام في الصناعة، الخدمات اللوجستية، والقطاع الثالث في جميع أنحاء المغرب.",
        split_cand_btn: "تصفح العروض",
        marquee_title: "يضعون ثقتهم فينا كل يوم",
        sim_badge: "فضاء الشركات",
        sim_title: "محاكي تفويض الموارد البشرية",
        sim_desc: "قم بتقدير توفير فرق العمل المؤقتة فوراً وفقاً لقطاعك والحجم المطلوب.",
        sim_label1: "قطاع النشاط:",
        sim_label2: "عدد الملفات المطلوبة:",
        opt_ind: "الصناعة والإنتاج",
        opt_log: "الخدمات اللوجستية والنقل",
        opt_btp: "البناء والتشيد",
        opt_ter: "القطاع الثالث والإداري",
        opt_sante: "الصحة والنظافة",
        sim_garant: "تفويض مضمون في غضون",
        sim_btn: "اطلب هذه الفريق",
        serv_span: "حلولنا للموارد البشرية",
        serv_title: "خدمات مصممة لنموك",
        serv_desc: "عرض متكامل لخدمات الموارد البشرية لتلبية جميع تحدياتك التشغيلية بمرونة.",
        s1_title: "العمل المؤقت والتوظيف",
        s1_desc: "تفويض سريع للموظفين الأكفاء لإدارة الظروف الطارئة والإجازات وذروة النشاط.",
        s2_title: "توظيف دائم (CDI / CDD)",
        s2_desc: "بحث مخصص، اختبارات واختيار دائم لدمج المواهب المستقبلية الرئيسية.",
        s3_title: "توفير الموظفين",
        s3_desc: "توفير فرق تشغيلية جاهزة للتدخل الفوري في مواقع العمل الخاصة بك.",
        s4_title: "الإدارة والرواتب",
        s4_desc: "التكفل الكامل بالعقود، التصريحات الاجتماعية والامتثال القانوني في المغرب.",
        sect_span: "مجالات الخبرة",
        sect_title: "قطاعات تدخلنا",
        sect_desc: "انقر على أي قطاع لاكتشاف حلولنا المخصصة وطلب تفويض فوري.",
        sec_ind: "الصناعة",
        sec_btp: "البناء والتشييد",
        sec_log: "اللوجستيك",
        sec_ter: "القطاع الثالث",
        sec_it: "أنظمة المعلومات",
        sec_call: "مراكز الاتصال",
        sec_med: "الصحة والطب",
        sec_clean: "النظافة المهنية",
        abo_span: "تاريخنا وقيمنا",
        abo_title: "حول PRO C2S",
        abo_desc: "تأسست في 2017 بالرباط، تلتزم PRO C2S يومياً بتقديم المرونة والأمان القانوني للشركات والمواهب.",
        a1_title: "القرب والاستماع",
        a1_desc: "مسؤول موارد بشرية مخصص يفهم متطلبات عملك ويتكيف مع حالات الطوارئ في الميدان.",
        a2_title: "امتثال صارم",
        a2_desc: "احترام صارم لقانون الشغل المغربي، تتبع كامل وشفافية تعاقدية.",
        a3_title: "مرونة تشغيلية",
        a3_desc: "القدرة على نشر متعاونين مؤهلين في غضون ساعات لتلبية فترات ذروة النشاط.",
        a4_title: "المتابعة والاندماج",
        a4_desc: "مرافقة مستمرة لكل عامل مؤقت لضمان الإنتاجية الفورية في مواقع العمل.",
        st1: "سنوات الخبرة",
        st2: "الشركات الشريكة",
        st3: "العاملين المؤقتين سنوياً",
        st4: "معدل الرضا",
        job_span: "فرص العمل",
        job_title: "أحدث مهام العمل المؤقت",
        job_desc: "قم بالتصفية حسب المهارات وانقر على العرض للتقدم مباشرة.",
        f_all: "جميع العروض",
        f_trans: "النقل واللوجستيك",
        f_admin: "الإدارة وتقنيات المعلومات",
        f_sante: "الصحة والرياضة",
        badge_interim: "مؤقت",
        badge_recent: "حديث",
        badge_urg: "عاجل",
        btn_apply_card: "عرض التفاصيل والتقدم",
        test_span: "آراء العملاء",
        test_title: "ما يقوله شركاؤنا",
        test_desc: "رضا الشركات الشريكة والمرشحين هو أعظم نجاح لنا.",
        t1_text: "\"أنقذت لنا PRO C2S الموقف خلال ذروة نشاط غير متوقعة. ملفات مؤهلة تم تفويضها في أقل من 48 ساعة. شريك حقيقي موثوق!\"",
        t1_auth: "مسؤول الموارد البشرية، القطاع الصناعي",
        t2_text: "\"بفضل PRO C2S، وجدت مهمة مؤقتة بسرعة مع متابعة مهنية واحترام لمواعيد الدفع. أنصح به بشدة!\"",
        t2_auth: "عامل مؤقت في اللوجستيك",
        faq_span: "الأسئلة الشائعة",
        faq_title: "كل ما تحتاج إلى معرفته",
        faq_desc: "إجابات واضحة للشركات والمرشحين حول كيفية عمل PRO C2S.",
        fq1: "ما هي المواعيد النهائية لتفويض العاملين المؤقتين؟",
        fa1: "بفضل شبكتنا الفعالة في جميع أنحاء المغرب، نحن قادرون على توفير ملفات مؤهلة في غضون 24 إلى 48 ساعة.",
        fq2: "ما مدى الامتثال القانوني للعقود في المغرب؟",
        fa2: "تطبق PRO C2S بصرامة قانون الشغل المغربي. نتكفل بجميع التزامات القانونية: CNSS، العقود، والتأمينات بدون أي مخاطر على الشركة.",
        m_loc: "المكان:",
        m_prof: "الملف المطلوب:",
        m_desc_title: "وصف الوظيفة والمهام:",
        m_whatsapp: "التقدم عبر واتساب",
        contact_tag: "اتصل بنا",
        contact_title: "دعنا نتحدث عن مشروعك",
        contact_desc: "اتصل بنا لمناقشة احتياجاتك وطلب عرض سعر مجاني ومخصص.",
        c_resp: "المسؤول",
        c_phone: "الهاتف",
        c_mail: "البريد الإلكتروني",
        c_addr: "العنوان",
        c_addr_val: "عمارة 69، الطابق 4، شقة 04، شارع باتريس لومومبا، حسان - الرباط",
        ph_name: "الاسم الكامل",
        ph_mail: "البريد الإلكتروني",
        ph_phone: "الهاتف",
        ph_msg: "رسالتك",
        btn_send: "إرسال",
        foot_desc: "شركة متخصصة في التوظيف والعمل المؤقت والنظافة المهنية تأسست عام 2017. شريكك لبناء فرق المستقبل.",
        foot_nav: "التنقل",
        foot_contact: "اتصل بنا",
        toast_msg: "تم إرسال رسالتك بنجاح!"
    }
};

function changeLanguage(lang) {
    localStorage.setItem("preferred_lang", lang);
    
    // Switch Active Button Style
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active-lang"));
    const activeBtn = document.getElementById("btn-" + lang);
    if(activeBtn) activeBtn.classList.add("active-lang");

    // Handle RTL & Direction
    if (lang === 'ar') {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
    } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", lang);
    }

    // Translate attributes [data-key]
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Translate placeholders [data-placeholder]
    document.querySelectorAll("[data-placeholder]").forEach(el => {
        const pKey = el.getAttribute("data-placeholder");
        if (translations[lang] && translations[lang][pKey]) {
            el.setAttribute("placeholder", translations[lang][pKey]);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Check stored language on load
    const savedLang = localStorage.getItem("preferred_lang") || "fr";
    changeLanguage(savedLang);

    // Navbar Scroll Shadow
    const header = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        if(window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if(window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if(menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;
    const statsSection = document.querySelector(".stats");

    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const prefix = counter.getAttribute("data-prefix") || "";
                const suffix = counter.getAttribute("data-suffix") || "";
                const duration = 1600;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = prefix + Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = prefix + target + suffix;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.3 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    // Job Filters & Modal
    const filterBtns = document.querySelectorAll(".filter-btn");
    const allJobCards = document.querySelectorAll(".job-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");

            allJobCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    const modal = document.getElementById("jobModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalBadge = document.getElementById("modalBadge");
    const modalSector = document.getElementById("modalSector");
    const modalLocation = document.getElementById("modalLocation");
    const modalReq = document.getElementById("modalReq");
    const modalDesc = document.getElementById("modalDesc");
    const modalApplyBtn = document.getElementById("modalApplyBtn");

    allJobCards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.innerText = card.getAttribute("data-title");
            modalBadge.innerText = card.getAttribute("data-type");
            modalBadge.className = `modal-header-badge job-badge ${card.getAttribute("data-badge")}`;
            modalSector.innerHTML = `<i class="fa-solid fa-briefcase"></i> ${card.getAttribute("data-sector")}`;
            modalLocation.innerText = card.getAttribute("data-location");
            modalReq.innerText = card.getAttribute("data-req");
            modalDesc.innerText = card.getAttribute("data-desc");
            modalApplyBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(card.getAttribute("data-wa"))}`;
            if(modal) modal.classList.add("open");
        });
    });

    const sectorCards = document.querySelectorAll(".sector-card");
    sectorCards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.innerText = card.getAttribute("data-title");
            modalBadge.innerText = "Secteur d'Expertise";
            modalBadge.className = "modal-header-badge job-badge interim";
            modalSector.innerHTML = `<i class="fa-solid fa-circle-check"></i> PRO C2S Maroc`;
            modalLocation.innerText = "Disponibilité Nationale";
            modalReq.innerText = "Intervention Rapide (24h/48h)";
            modalDesc.innerText = card.getAttribute("data-desc");
            modalApplyBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(card.getAttribute("data-wa"))}`;
            if(modal) modal.classList.add("open");
        });
    });

    if(closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("open"); });
    }

    // Simulator
    const simSector = document.getElementById("simSector");
    const simCount = document.getElementById("simCount");
    const simWhatsAppBtn = document.getElementById("simWhatsAppBtn");

    function updateSimLink() {
        if(simSector && simWhatsAppBtn) {
            const count = simCount.value || 1;
            const msg = `Bonjour PRO C2S, nous souhaitons une délégation de ${count} profil(s) dans le secteur: ${simSector.value}. Pouvez-vous nous transmettre une étude / devis ?`;
            simWhatsAppBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(msg)}`;
        }
    }

    if(simSector && simCount) {
        simSector.addEventListener("change", updateSimLink);
        simCount.addEventListener("input", updateSimLink);
        updateSimLink();
    }

    // FAQ Accordion
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            const isOpen = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            if(!isOpen) item.classList.add("active");
        });
    });

    // Contact EmailJS Form
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toastNotification");

    function showToast(message, isError = false) {
        if(toast) {
            toast.querySelector("span").innerText = message;
            toast.style.background = isError ? "#e11d48" : "#1b5e20";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 4000);
        }
    }

    if(contactForm) {
        emailjs.init({ publicKey: "W70dwCkNbwmFHeSOA" });
        const submitBtn = contactForm.querySelector("button[type='submit']");

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;

            emailjs.sendForm("service_d9cvkm8", "template_ob7d4cb", this)
                .then(() => {
                    showToast("Votre message a été transmis avec succès !");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Erreur EmailJS:", error);
                    showToast("Erreur lors de l'envoi du message.", true);
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});