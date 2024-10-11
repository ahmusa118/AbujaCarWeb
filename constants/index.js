import {  merc1,merc2,merc3,merc4,boss,shedrack,rahmatu,jemimah,wole,realrnt,realrnt1,cafe6,cafe5,ferrari,highace1,highace2,rangerover1,rangerover2,gle1,gle2,abjcarrentals,cafebyabj,abjcarnormal,cafe3,cafe4,cafe2,cafe1,ferrarirntal,rentals2, rentals1  } from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Home",
  },
  {
    id: "Whyabujacar",
    title: "Features",
  },
  {
    id: "Bookfree",
    title: "Clients",
  },
  {
    id: "team",
    title: "Team",
  },
  {
    id: "gallery",
    title: "Gallery",
  }
];
export const raNavLinks=[
  {id:'sellerLogin',title:'Seller Login'}
]


export const frontslider=[merc1,merc2,merc3,merc4]
export const bck=[{
  id:'back',
  title:'Back'
}]
export const teams=[
  {
    name:'Sadiq Saminu',
    position:'C.E.O',
    image:boss
  },{
    name:'Danjuma Jemimah',
    position:'Marketing Manager',
    image:jemimah
  },{
    name:'Oluwole Akanbi',
    position:'Accountant',
    image:wole

  },{
    name:'Rahamatu Suleiman Sanusi',
    position:'AbujaCar Rentals Manager',
    image:rahmatu
  },{
    name:'Shedrack Alunyor',
    position:'AbujaCar Sales Manager',
    image:shedrack
  }
]
export const enlargelinks=[
  {
    id:'back',
    title:'Back'
  }
]
export const features = [
  {
    id: "abujacar",
    images: [ferrari,gle1,gle2,highace2],
    title: "AbujaCar",
    num:0,
    logo:abjcarnormal,
    page:'/tl',
    content:
      "With great pleasure and delight, I welcome you to Abujacar Foundation, an initiative on the mission to empower upcoming Automobile dealers through relevant education, skills development, innovation, and focus more on creating jobs. This we have done over the past years and have recorded significant impact through various activities that have been beneficial to many.",
  },
  {
    id: "abujacarrentals",
    images: [realrnt,rentals1],
    title: "AbujaCar Rentals",
    num:1,
    logo:abjcarrentals,
    page:'/rental',
    content:
      "We are local suppliers of transport solutions mainly the car rental service. Our ensure client flexibility, comfort, and convenience. We provide more than just car rental service. We ensure that our clients are experience in our fleet of excellent automobiles. ",
  },
  {
    id: "cafebyabujacar",
    images: [cafe2,cafe4,cafe3,cafe6,cafe5 ],
    title: "Cafe by AbujaCar",
    num:2,
    logo:cafebyabj,
    page:'/cafe',
    content:
      "Your one-stop point for all your stomach cravings with our wide range of exquisite dishes, drinks, and snacks, and an ambi- ance that is serene and venust, you are sure to always have a satisfying dining ex- perience with us",
  },
  {
    id: "abujacarlogistics",
    images: [rentals2, rentals1 ],
    title: "AbujaCar logistics",
    num:3,
    logo:abjcarnormal,
    content:
      "A top haulage and freight service company focused on meeting customers need for small and large capacity automobile logistics. We are flexible and responsive when ensuring the secure storage, handling and transportation of vehicles within the FCT and nationwide.",
  }
];

/*export const enlargelinks=[
  {
    id:'back',
    title:'Back'
  }
]
export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Manned Guarding",
    content:
      "Provision of security guards that are fully compliant with global security practices",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "CCTV Monitoring and Installations",
    content:
      "Specialty in cctv monitoring and installation of CCTV hardware that are compliant with world standards",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Event and Venue Security",
    content:
      "Security and monitoring in events such as construction sites, housing estates, neighborhoods,organizations and many more",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Great customer service and security services",
    name: "Management",
    title: "G-Empire Landmark project ltd",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "We are completely impressed with their professionalism.",
    name: "The Director of Security Services",
    title: "Central Bank of Nigeria",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Great Experience and a great security service",
    name: "Arch Tony",
    title: "N.C.C.E quarters, Abuja.",
    img: people03,
  },
];

export const featuredservices =[
  {
    id: "service-1",
    title: "Manned Guarding",
    img: st,
    writeup:'Our company is proud to offer a comprehensive range of manned services, providing a human touch to your security and support needs. Our team of highly trained and experienced professionals is dedicated to delivering exceptional service that goes beyond expectations.'
  },
  {
    id: "service-2",
    title: "Security Consultation",
    img: sp,
    writeup:'Our experienced security consultants possess in-depth knowledge of the latest security threats, attack vectors, and industry best practices. We conduct thorough security assessments to identify and evaluate potential vulnerabilities across your organization infrastructure, systems, and operations.'
    
  },
  {
    id: "service-3",
    title: "Event and Venue Security",
    img: cbnbh,
    writeup:'We understand that every event is unique, with its own set of security requirements and challenges. That is why we take a personalized approach, carefully assessing your event specific needs and crafting a tailored security plan that addresses every potential risk.'
  }
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "-",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/emirate_guardsngltd",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: cbnlogo,
  },
  {
    id: "client-2",
    logo: pres,
  },
  {
    id: "client-3",
    logo: nhis,
  },
  {
    id: "client-4",
    logo: sahad,
  },
];*/