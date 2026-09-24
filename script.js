/* ==========================================
   PRO C2S - SCRIPT.JS COMPLET (Multilingue Corrigé)
========================================== */

const translations = {
    fr: {
        nav_home: "Accueil",
        nav_companies: "Entreprises",
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
        hero_btn_recruit: "Vous recrutez ?",
        hero_btn_cv: "Déposer un CV",
        badge_speed: "Réactivité",
        badge_legal: "Conformité légale",
        badge_nat_val: "National",
        badge_nat: "Toutes régions",
        split_client_tag: "Entreprises",
        split_client_title: "Besoins urgents ou pics d'activité ?",
        split_client_desc: "Difficulté à recruter rapidement, complexité juridique ou surcroît temporaire : bénéficiez d'une délégation réactive.",
        split_client_btn: "Estimer mon besoin RH",
        split_cand_tag: "Candidats",
        split_cand_title: "Trouvez votre prochaine mission",
        split_cand_desc: "Intérim et missions dans l'industrie, la logistique, le tertiaire et les services dans tout le Maroc.",
        split_cand_btn: "Consulter les offres",
        refs_title: "Ils nous accordent leur confiance au quotidien",
        sim_badge: "ESPACE ENTREPRISES",
        sim_title: "Simulateur de délégation RH",
        sim_desc: "Estimez immédiatement la mise à disposition de vos équipes temporaires selon votre secteur et le volume souhaité.",
        sim_label_sector: "Secteur d'activité :",
        sim_label_count: "Nombre de profils recherchés :",
        sim_guarantee: "Délégation garantie sous",
        sim_btn_whatsapp: "Demander cette équipe",
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
        sec_span: "CHAMPS D'EXPERTISE",
        sec_title: "Nos Secteurs d'Intervention",
        sec_desc: "Cliquez sur un secteur pour découvrir nos solutions sur-mesure et demander une délégation immédiate.",
        abt_span: "NOTRE HISTOIRE & VALEURS",
        abt_title: "À Propos de PRO C2S",
        abt_desc: "Créée en 2017 à Rabat, PRO C2S s'engage au quotidien pour offrir aux entreprises et aux talents la flexibilité et la sécurité juridique qu'ils méritent.",
        a1_title: "Proximité & Écoute",
        a1_desc: "Un interlocuteur RH dédié qui comprend vos exigences métier et s'adapte à vos urgences sur le terrain.",
        a2_title: "Conformité Rigoureuse",
        a2_desc: "Respect strict de la législation marocaine du travail, traçabilité totale et transparence contractuelle.",
        a3_title: "Agilité Opérationnelle",
        a3_desc: "Capacité à déployer des collaborateurs qualifiés en quelques heures pour répondre à vos surcroîts d'activité.",
        a4_title: "Suivi & Intégration",
        a4_desc: "Accompagnement continu de chaque intérimaire pour garantir une productivité immédiate sur vos sites.",
        st_1: "Années d'expérience",
        st_2: "Entreprises partenaires",
        st_3: "Intérimaires placés / an",
        st_4: "Taux de satisfaction",
        job_sec_span: "OPPORTUNITÉS DE CARRIÈRE",
        job_sec_title: "Nos Dernières Missions d'Intérim",
        job_sec_desc: "Filtrez par pôle de compétences et cliquez sur une offre pour postuler en direct.",
        f_all: "Toutes les offres",
        f_trans: "Transport & Logistique",
        f_admin: "Administration & IT",
        f_sante: "Santé & Sport",
        t_span: "TÉMOIGNAGES CLIENTS",
        t_title: "Ce que disent nos partenaires",
        t_desc: "La satisfaction de nos entreprises clientes et de nos candidats est notre plus belle réussite.",
        t1_text: "PRO C2S nous a sauvé la mise lors d'un pic d'activité inattendu. Des profils qualifiés et opérationnels délégués en moins de 48h. Un vrai partenaire de confiance !",
        t1_auth: "Responsable RH, Secteur Industriel",
        t2_text: "Grâce à PRO C2S, j'ai trouvé une mission d'intérim rapidement avec un suivi professionnel et qui respecte toujours les délais de paiement et ne prend pas de retard dans ses règlements. Je recommande vivement !",
        t2_auth: "Intérimaire en Logistique",
        faq_span: "QUESTIONS FRÉQUENTES",
        faq_title: "Tout ce que vous devez savoir",
        faq_desc: "Des réponses claires pour les entreprises et les candidats sur le fonctionnement de PRO C2S.",
        q1: "Quels sont les délais pour déléguer du personnel intérimaire ?",
        a1: "Grâce à notre vivier actif et réactif dans tout le Maroc, nous sommes capables de mettre à disposition des profils qualifiés sous un délai moyen de 24h à 48h selon la spécificité des postes.",
        q2: "Quelle est la conformité juridique des contrats au Maroc ?",
        a2: "PRO C2S applique rigoureusement le Code du Travail marocain. Nous prenons en charge la totalité des obligations légales : déclarations CNSS, contrats de mission, assurances AT et gestion de la paie sans aucun risque pour l'entreprise utilisatrice.",
        q3: "Comment un candidat peut-il postuler à une mission ?",
        a3: "C'est direct et instantané : il vous suffit de cliquer sur l'offre de votre choix et de transmettre votre CV par WhatsApp à notre équipe RH dédiée. Votre profil sera traité sous 24h.",
        q4: "Intervenez-vous en dehors de l'axe Casablanca-Rabat ?",
        a4: "Oui, PRO C2S déploie des équipes opérationnelles sur l'ensemble du territoire national : Tanger, Kénitra, Fès, Oujda, Marrakech, Agadir et les régions du Sud.",
        contact_badge: "CONTACT",
        contact_title: "Parlons de votre projet",
        contact_desc: "Contactez-nous pour discuter de vos besoins et demander votre devis gratuit et personnalisé.",
        c_contact_lbl: "Contact",
        c_phone_lbl: "Téléphone",
        c_email_lbl: "Email",
        c_addr_lbl: "Adresse",
        c_addr_val: "Imm. 69, 4ème Étage, Appt 04, Av. Patrice Lumumba, Hassan - Rabat",
        form_name: "Nom complet",
        form_email: "Adresse e-mail",
        form_phone: "Téléphone",
        form_msg: "Votre message",
        form_btn: "Envoyer",
        cv_notice_txt: "Vous souhaitez postuler ou envoyer un CV ?",
        cv_notice_btn: "Envoyer mon CV via WhatsApp",
        footer_desc: "Société spécialisée en recrutement, intérim et propreté professionnelle créée en 2017. Votre partenaire pour construire vos équipes de demain.",
        footer_nav: "Navigation",
        footer_contact: "Contact",
        footer_rights: "Tous droits réservés.",
        footer_privacy: "Politique de confidentialité",
        cookie_title: "Gestion des Cookies & Confidentialité",
        cookie_text: "Nous utilisons des cookies pour améliorer votre expérience.",
        cookie_btn: "Tout accepter",
        toast_success: "Message envoyé avec succès !",
        m_loc: "Lieu:",
        m_prof: "Profil:",
        m_desc_title: "Description du poste & Missions :",
        m_apply: "Postuler via WhatsApp"
    },
    en: {
        nav_home: "Home",
        nav_companies: "Companies",
        nav_jobs: "Job Offers",
        nav_about: "About Us",
        nav_refs: "References",
        nav_faq: "FAQ",
        nav_contact: "Contact",
        nav_candidate: "Candidate Portal",
        nav_recruit: "Need to hire",
        hero_badge: "Recruitment & Temp Partner",
        hero_title: "Your HR partner to build tomorrow's teams",
        hero_desc: "Specialist in recruitment and temporary work in Morocco since 2017. We provide fast, flexible and compliant solutions for all your HR challenges.",
        hero_btn_recruit: "Hiring?",
        hero_btn_cv: "Submit a CV",
        badge_speed: "Responsiveness",
        badge_legal: "Legal compliance",
        badge_nat_val: "National",
        badge_nat: "All regions",
        split_client_tag: "Companies",
        split_client_title: "Urgent needs or activity peaks?",
        split_client_desc: "Difficulty hiring quickly, legal complexity or temporary surplus: benefit from a reactive delegation.",
        split_client_btn: "Estimate my HR need",
        split_cand_tag: "Candidates",
        split_cand_title: "Find your next mission",
        split_cand_desc: "Temporary and contract work in industry, logistics, services across Morocco.",
        split_cand_btn: "View offers",
        refs_title: "They trust us every day",
        sim_badge: "COMPANIES SPACE",
        sim_title: "HR Delegation Simulator",
        sim_desc: "Instantly estimate the provision of your temporary teams based on your sector and desired volume.",
        sim_label_sector: "Activity sector:",
        sim_label_count: "Number of profiles sought:",
        sim_guarantee: "Guaranteed delegation within",
        sim_btn_whatsapp: "Request this team",
        serv_span: "OUR HR SOLUTIONS",
        serv_title: "Services designed for your growth",
        serv_desc: "A complete range of HR services to agilely meet all your operational challenges.",
        s1_title: "Temporary Work & Interim",
        s1_desc: "Quick delegation of qualified personnel to manage unexpected events and activity peaks.",
        s2_title: "Permanent / Fixed-term Recruitment",
        s2_desc: "Tailored sourcing and rigorous selection to integrate your future key talents.",
        s3_title: "Personnel Provision",
        s3_desc: "Deployment of operational teams ready to intervene immediately on your sites.",
        s4_title: "Administrative Management & Payroll",
        s4_desc: "Full handling of contracts, social declarations and legal compliance in Morocco.",
        sec_span: "FIELDS OF EXPERTISE",
        sec_title: "Our Sectors of Intervention",
        sec_desc: "Click on a sector to discover our custom solutions and request immediate delegation.",
        abt_span: "OUR HISTORY & VALUES",
        abt_title: "About PRO C2S",
        abt_desc: "Created in 2017 in Rabat, PRO C2S is committed daily to offering companies and talents the flexibility and legal security they deserve.",
        a1_title: "Proximity & Listening",
        a1_desc: "A dedicated HR contact who understands your business requirements and adapts to your on-site emergencies.",
        a2_title: "Rigorous Compliance",
        a2_desc: "Strict compliance with Moroccan labor legislation, total traceability and contractual transparency.",
        a3_title: "Operational Agility",
        a3_desc: "Ability to deploy qualified employees within hours to meet your activity surges.",
        a4_title: "Monitoring & Integration",
        a4_desc: "Continuous support for each temporary worker to guarantee immediate productivity on your sites.",
        st_1: "Years of experience",
        st_2: "Partner companies",
        st_3: "Temps placed / year",
        st_4: "Satisfaction rate",
        job_sec_span: "CAREER OPPORTUNITIES",
        job_sec_title: "Our Latest Interim Missions",
        job_sec_desc: "Filter by skills hub and click on an offer to apply directly.",
        f_all: "All offers",
        f_trans: "Transport & Logistics",
        f_admin: "Administration & IT",
        f_sante: "Health & Sport",
        t_span: "CLIENT TESTIMONIALS",
        t_title: "What our partners say",
        t_desc: "The satisfaction of our client companies and candidates is our greatest success.",
        t1_text: "PRO C2S saved us during an unexpected activity peak. Qualified and operational profiles delegated in less than 48h. A true trusted partner!",
        t1_auth: "HR Manager, Industrial Sector",
        t2_text: "Thanks to PRO C2S, I quickly found a temporary mission with professional monitoring. Highly recommend!",
        t2_auth: "Logistics Temp",
        faq_span: "FREQUENTLY ASKED QUESTIONS",
        faq_title: "Everything you need to know",
        faq_desc: "Clear answers for companies and candidates on how PRO C2S works.",
        q1: "What are the timeframes for delegating temporary staff?",
        a1: "Thanks to our active and reactive pool across Morocco, we are able to provide qualified profiles within an average of 24h to 48h.",
        q2: "What is the legal compliance of contracts in Morocco?",
        a2: "PRO C2S rigorously applies Moroccan Labor Law. We handle all legal obligations: CNSS declarations, mission contracts, AT insurance and payroll without risk.",
        q3: "How can a candidate apply for a mission?",
        a3: "It's direct and instant: simply click on the offer of your choice and send your CV via WhatsApp to our dedicated HR team.",
        q4: "Do you operate outside the Casablanca-Rabat axis?",
        a4: "Yes, PRO C2S deploys operational teams across the entire national territory: Tangier, Kenitra, Fes, Oujda, Marrakech, Agadir and southern regions.",
        contact_badge: "CONTACT",
        contact_title: "Let's talk about your project",
        contact_desc: "Contact us to discuss your needs and request your free and personalized quote.",
        c_contact_lbl: "Contact",
        c_phone_lbl: "Phone",
        c_email_lbl: "Email",
        c_addr_lbl: "Address",
        c_addr_val: "Imm. 69, 4th Floor, Appt 04, Patrice Lumumba Ave, Hassan - Rabat",
        form_name: "Full name",
        form_email: "Email address",
        form_phone: "Phone",
        form_msg: "Your message",
        form_btn: "Send",
        cv_notice_txt: "Want to apply or send a CV?",
        cv_notice_btn: "Send my CV via WhatsApp",
        footer_desc: "Company specialized in recruitment, interim and professional cleaning created in 2017. Your partner to build tomorrow's teams.",
        footer_nav: "Navigation",
        footer_contact: "Contact",
        footer_rights: "All rights reserved.",
        footer_privacy: "Privacy Policy",
        cookie_title: "Cookies & Privacy Management",
        cookie_text: "We use cookies to improve your experience.",
        cookie_btn: "Accept all",
        toast_success: "Message sent successfully!",
        m_loc: "Location:",
        m_prof: "Profile:",
        m_desc_title: "Job description & Missions:",
        m_apply: "Apply via WhatsApp"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_companies: "الشركات",
        nav_jobs: "عروض العمل",
        nav_about: "من نحن",
        nav_refs: "مراجعنا",
        nav_faq: "الأسئلة الشائعة",
        nav_contact: "اتصل بنا",
        nav_candidate: "فضاء المرشح",
        nav_recruit: "ترغب في التوظيف؟",
        hero_badge: "شريك التوظيف والعمل المؤقت",
        hero_title: "شريكك في الموارد البشرية لبناء فرق المستقبل",
        hero_desc: "متخصصون في التوظيف والعمل المؤقت في المغرب منذ عام 2017. نقدم حلولاً سريعة ومرنة ومتوافقة مع جميع تحديات الموارد البشرية الخاصة بك.",
        hero_btn_recruit: "هل توظف؟",
        hero_btn_cv: "إرسال السيرة الذاتية",
        badge_speed: "سرعة الاستجابة",
        badge_legal: "التزام قانوني",
        badge_nat_val: "وطني",
        badge_nat: "جميع الجهات",
        split_client_tag: "الشركات",
        split_client_title: "احتياجات عاجلة أو ضغط في العمل؟",
        split_client_desc: "صعوبة التوظيف السريع، التعقيدات القانونية أو الذروة المؤقتة: استفد من تفويض سريع ومرن.",
        split_client_btn: "تقدير احتياجات الموارد البشرية",
        split_cand_tag: "المرشحون",
        split_cand_title: "اعثر على مهمتك القادمة",
        split_cand_desc: "عمل مؤقت ومهام في الصناعة، الخدمات، واللوجستيك في جميع أنحاء المغرب.",
        split_cand_btn: "تصفح العروض",
        refs_title: "يثقون بنا يومياً",
        sim_badge: "فضاء الشركات",
        sim_title: "محاكي تفويض الموارد البشرية",
        sim_desc: "احسب فوراً تكلفة وتوفير الفرق المؤقتة حسب قطاعك والحجم المطلوب.",
        sim_label_sector: "قطاع النشاط:",
        sim_label_count: "عدد الملفات المطلوبة:",
        sim_guarantee: "التفويض مضمون خلال",
        sim_btn_whatsapp: "اطلب هذا الفريق",
        serv_span: "حلولنا في الموارد البشرية",
        serv_title: "خدمات مصممة خصيصاً لنموك",
        serv_desc: "مجموعة متكاملة من خدمات الموارد البشرية للاستجابة بمرونة لجميع تحدياتك التشغيلية.",
        s1_title: "العمل المؤقت والتوظيف المؤقت",
        s1_desc: "تفويض سريع للموظفين الأكفاء لإدارة العطل والذروة المفاجئة في النشاط.",
        s2_title: "التوظيف الدائم (CDI / CDD)",
        s2_desc: "البحث المخصص والاختيار الدقيق لدمج مواهب المستقبل الرئيسية لديك بشكل دائم.",
        s3_title: "توفير الموظفين والفرق",
        s3_desc: "إنشاء فرق تشغيلية جاهزة للتدخل الفوري في مواقع العمل الخاصة بك.",
        s4_title: "الإدارة الإدارية والرواتب",
        s4_desc: "تولي كامل للعقود، التصريحات الاجتماعية والامتثال القانوني في المغرب.",
        sec_span: "مجالات الخبرة",
        sec_title: "قطاعات تدخلنا",
        sec_desc: "انقر على أي قطاع لاكتشاف حلولنا المخصصة وطلب تفويض فوري.",
        abt_span: "تاريخنا وقيمنا",
        abt_title: "حول PRO C2S",
        abt_desc: "أنشئت في 2017 بالرباط، تلتزم PRO C2S يومياً بتقديم المرونة والأمان القانوني الذي يستحقه الشركاء والمواهب.",
        a1_title: "القرب والاستماع",
        a1_desc: "مسؤول موارد بشرية مخصص يفهم متطلبات عملك ويتكيف مع طوارئك ميدانياً.",
        a2_title: "امتثال صارم",
        a2_desc: "الالتزام التام بقانون الشغل المغربي، الشفافية والتعاقد الواضح.",
        a3_title: "مرونة تشغيلية",
        a3_desc: "القدرة على نشر متعاونين مؤهلين في غضون ساعات قليلة للاستجابة لذروة النشاط.",
        a4_title: "المتابعة والدمج",
        a4_desc: "مرافقة مستمرة لكل عامل مؤقت لضمان الإنتاجية الفورية في مواقعكم.",
        st_1: "سنوات الخبرة",
        st_2: "شركات شريكة",
        st_3: "عمال مؤقتون / سنة",
        st_4: "نسبة الرضا",
        job_sec_span: "فرص العمل",
        job_sec_title: "أحدث مهام العمل المؤقت",
        job_sec_desc: "قم بالتصفية حسب المهارات وانقر على العرض للتقدم مباشرة.",
        f_all: "جميع العروض",
        f_trans: "النقل واللوجستيك",
        f_admin: "الإدارة وتقنيات المعلومات",
        f_sante: "الصحة والرياضة",
        t_span: "آراء العملاء",
        t_title: "ما يقوله شركاؤنا",
        t_desc: "رضا شركاتنا العميلة ومرشحينا هو أعظم نجاح لنا.",
        t1_text: "أنقذتنا PRO C2S خلال فترة ذروة نشاط غير متوقعة. كفاءات تم تفويضها في أقل من 48 ساعة. شريك موثوق حقاً!",
        t1_auth: "مسؤول الموارد البشرية، قطاع الصناعة",
        t2_text: "بفضل PRO C2S، وجدت مهمة مؤقتة بسرعة مع متابعة احترافية واحترام مواعيد الأداء. أنصح بشدة!",
        t2_auth: "عامل مؤقت في اللوجستيك",
        faq_span: "الأسئلة الشائعة",
        faq_title: "كل ما تحتاج إلى معرفته",
        faq_desc: "إجابات واضحة للشركات والمرشحين حول كيفية عمل PRO C2S.",
        q1: "ما هي المهل الزمنية لتفويض الموظفين المؤقتين؟",
        a1: "بفضل قاعدتنا النشطة في جميع أنحاء المغرب، نحن قادرون على توفير ملفات تعريف مؤهلة في غضون 24 إلى 48 ساعة.",
        q2: "ما مدى الامتثال القانوني للعقود في المغرب؟",
        a2: "تطبق PRO C2S قانون الشغل المغربي بصرامة. نتولى بالكامل التزامات CNSS وعقود المهمة والتأمين.",
        q3: "كيف يمكن للمرشح التقدم بطلب للحصول على مهمة؟",
        a3: "الأمر مباشر وفوري: ما عليك سوى النقر على العرض الذي تختاره وإرسال سيرتك الذاتية عبر واتساب.",
        q4: "هل تدخلون خارج محور الدار البيضاء-الرباط؟",
        a4: "نعم، تنشر PRO C2S فرقاً تشغيلية في جميع أنحاء التراب الوطني: طنجة، القنيطرة، فاس، وجدة، مراكش، أكادير ومناطق الجنوب.",
        contact_badge: "اتصل بنا",
        contact_title: "دعنا نتحدث عن مشروعك",
        contact_desc: "اتصل بنا لمناقشة احتياجاتك وطلب عرض سعر مجاني ومخصص.",
        c_contact_lbl: "المسؤول",
        c_phone_lbl: "الهاتف",
        c_email_lbl: "البريد الإلكتروني",
        c_addr_lbl: "العنوان",
        c_addr_val: "عمارة 69، الطابق 4، الشقة 04، شارع باتريس لومومبا، حسان - الرباط",
        form_name: "الاسم الكامل",
        form_email: "البريد الإلكتروني",
        form_phone: "رقم الهاتف",
        form_msg: "رسالتك",
        form_btn: "إرسال",
        cv_notice_txt: "هل ترغب في التقدم أو إرسال السيرة الذاتية؟",
        cv_notice_btn: "إرسال سيرتي الذاتية عبر واتساب",
        footer_desc: "شركة متخصصة في التوظيف والعمل المؤقت والنظافة المهنية أنشئت عام 2017. شريكك لبناء فرق المستقبل.",
        footer_nav: "التنقل",
        footer_contact: "اتصل بنا",
        footer_rights: "جميع الحقوق محفوظة.",
        footer_privacy: "سياسة الخصوصية",
        cookie_title: "إدارة ملفات تعريف الارتباط والخصوصية",
        cookie_text: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
        cookie_btn: "قبول الكل",
        toast_success: "تم إرسال رسالتك بنجاح!",
        m_loc: "المكان:",
        m_prof: "الملف المطلوب:",
        m_desc_title: "وصف الوظيفة والمهام:",
        m_apply: "التقدم عبر واتساب"
    }
};

function changeLanguage(lang) {
    localStorage.setItem("proC2s_lang", lang);
    
    if (lang === 'ar') {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
    } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", lang);
    }

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active-lang"));
    const activeBtn = document.getElementById("btn-" + lang);
    if(activeBtn) activeBtn.classList.add("active-lang");

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    document.querySelectorAll("[data-ph]").forEach(el => {
        const phKey = el.getAttribute("data-ph");
        if (translations[lang] && translations[lang][phKey]) {
            el.placeholder = translations[lang][phKey];
        }
    });
}

window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", function() {
    const savedLang = localStorage.getItem("proC2s_lang") || "fr";
    changeLanguage(savedLang);

    // Navigation Active Scroll & Shadow
    const links = document.querySelectorAll(".nav-links a");
    const header = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        let current = "";
        document.querySelectorAll("section").forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + current){
                link.classList.add("active");
            }
        });

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

    // Cookie Banner
    const cookieBanner = document.getElementById("cookieConsentBanner");
    const acceptBtn = document.getElementById("acceptCookiesBtn");

    if (localStorage.getItem("proC2sCookiesAccepted") === "true") {
        if (cookieBanner) cookieBanner.style.display = "none";
    }

    if (acceptBtn && cookieBanner) {
        acceptBtn.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.setItem("proC2sCookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });
    }

    // Modal Politique
    const privacyModal = document.getElementById("privacyModal");
    const openPrivacyModal = document.getElementById("openPrivacyModal");
    const closePrivacyBtn = document.getElementById("closePrivacyBtn");

    function togglePrivacyModal(e) {
        if(e) e.preventDefault();
        if(privacyModal) privacyModal.classList.toggle("open");
    }

    if(openPrivacyModal) openPrivacyModal.addEventListener("click", togglePrivacyModal);
    if(closePrivacyBtn) closePrivacyBtn.addEventListener("click", togglePrivacyModal);
    
    if(privacyModal) {
        privacyModal.addEventListener("click", (e) => {
            if(e.target === privacyModal) privacyModal.classList.remove("open");
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

    if(statsSection) statsObserver.observe(statsSection);

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
            modalApplyBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Postuler via WhatsApp`;
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

    // Contact EmailJS
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMsg");

    function showToast(message, isError = false) {
        if(toast && toastMsg) {
            toastMsg.innerText = message;
            toast.style.background = isError ? "#e11d48" : "#1b5e20";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 4000);
        }
    }

    if(contactForm) {
        if (typeof emailjs !== 'undefined') {
            emailjs.init({ publicKey: "W70dwCkNbwmFHeSOA" });
        }
        const submitBtn = contactForm.querySelector("button[type='submit']");

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;

            emailjs.sendForm("service_d9cvkm8", "template_ob7d4cb", this)
                .then(() => {
                    showToast("Message envoyé avec succès !");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Erreur EmailJS:", error);
                    showToast("Erreur lors de l'envoi.", true);
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});