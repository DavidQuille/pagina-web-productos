1:"$Sreact.fragment"
2:I[5167,["33","static/chunks/2f0b94e8-07c18b8cbde31aa2.js","930","static/chunks/164f4fb6-11b4d3dc347acbf2.js","402","static/chunks/402-cdf105d1c288e401.js","177","static/chunks/app/layout-8cf37ddbd7b3654a.js"],"CartProvider"]
3:I[5923,["33","static/chunks/2f0b94e8-07c18b8cbde31aa2.js","930","static/chunks/164f4fb6-11b4d3dc347acbf2.js","402","static/chunks/402-cdf105d1c288e401.js","177","static/chunks/app/layout-8cf37ddbd7b3654a.js"],"default"]
4:I[2493,["33","static/chunks/2f0b94e8-07c18b8cbde31aa2.js","930","static/chunks/164f4fb6-11b4d3dc347acbf2.js","402","static/chunks/402-cdf105d1c288e401.js","177","static/chunks/app/layout-8cf37ddbd7b3654a.js"],"default"]
5:I[9766,[],""]
6:I[8924,[],""]
7:I[1402,["33","static/chunks/2f0b94e8-07c18b8cbde31aa2.js","930","static/chunks/164f4fb6-11b4d3dc347acbf2.js","402","static/chunks/402-cdf105d1c288e401.js","177","static/chunks/app/layout-8cf37ddbd7b3654a.js"],""]
c:I[7150,[],""]
:HL["/_next/static/css/e8bac7e7bd3e9b1d.css","style"]
8:T59a,
            // Lógica para Animaciones al hacer Scroll
            function setupAnimations() {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                  }
                });
              }, {
                threshold: 0.05, // Menor umbral: se activa cuando el 5% del elemento es visible en lugar del 10%
                rootMargin: '0px 0px -10% 0px' // Se activa un poco antes de que el elemento entre en la vista
              });
              
              const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
              console.log("Elementos para animar:", sectionsToAnimate.length);
              sectionsToAnimate.forEach(section => {
                observer.observe(section);
              });
            }
            
            // Asegurar que se ejecuta cuando el DOM está listo
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              setTimeout(setupAnimations, 200); // Mucho más rápido: 200ms en lugar de 1000ms
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(setupAnimations, 200); // Mucho más rápido: 200ms en lugar de 1000ms
              });
            }
          0:{"P":null,"b":"8N028fHjuBAz8QoyhOnOW","p":"","c":["","admin"],"i":false,"f":[[["",{"children":["admin",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/e8bac7e7bd3e9b1d.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"es","className":"scroll-smooth","children":[["$","head",null,{"children":[["$","link",null,{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.gstatic.com","crossOrigin":""}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap","rel":"stylesheet"}]]}],["$","body",null,{"className":"text-gray-800 font-['Inter',sans-serif] bg-[#f8f9fa] min-h-screen flex flex-col","children":[["$","$L2",null,{"children":[["$","$L3",null,{}],["$","$L4",null,{}],["$","main",null,{"className":"flex-1","children":["$","$L5",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}],["$","footer",null,{"id":"contacto","className":"bg-gradient-to-r from-[#a34e96] to-[#3e5497] text-white py-4","children":["$","div",null,{"className":"container mx-auto px-6 text-center","children":[["$","p",null,{"className":"text-sm","children":"© 2025 Para tu bebé. Todos los derechos reservados."}],["$","div",null,{"className":"mt-2","children":["$","a",null,{"href":"/contacto","className":"text-white hover:text-[#f5c3cf] transition-colors duration-300 font-medium","children":"Contacto"}]}],["$","div",null,{"className":"mt-2 text-xs text-gray-200"}]]}]}]]}],["$","$L7",null,{"id":"intersection-observer","strategy":"afterInteractive","children":"$8"}]]}]]}]]}],{"children":["admin","$L9",{"children":["__PAGE__","$La",{},null,false]},null,false]},null,false],"$Lb",false]],"m":"$undefined","G":["$c",[]],"s":false,"S":true}
d:I[1959,[],"ClientPageRoot"]
e:I[4384,["9","static/chunks/9-e3e2fedc2a2bc1f6.js","288","static/chunks/288-f55a67611abffc1f.js","698","static/chunks/app/admin/page-42d779d35c0fd84d.js"],"default"]
11:I[4431,[],"OutletBoundary"]
13:I[5278,[],"AsyncMetadataOutlet"]
15:I[4431,[],"ViewportBoundary"]
17:I[4431,[],"MetadataBoundary"]
18:"$Sreact.suspense"
9:["$","$1","c",{"children":[null,["$","$L5",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L6",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
a:["$","$1","c",{"children":[["$","$Ld",null,{"Component":"$e","searchParams":{},"params":{},"promises":["$@f","$@10"]}],null,["$","$L11",null,{"children":["$L12",["$","$L13",null,{"promise":"$@14"}]]}]]}]
b:["$","$1","h",{"children":[null,[["$","$L15",null,{"children":"$L16"}],null],["$","$L17",null,{"children":["$","div",null,{"hidden":true,"children":["$","$18",null,{"fallback":null,"children":"$L19"}]}]}]]}]
f:{}
10:"$a:props:children:0:props:params"
16:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
12:null
14:{"metadata":[["$","title","0",{"children":"Para tu bebé | Productos con amor para los más pequeños"}],["$","meta","1",{"name":"description","content":"Encuentra todo lo que necesitas para tu bebé en un solo lugar."}]],"error":null,"digest":"$undefined"}
19:"$14:metadata"
