
import React, { useState, useCallback } from 'react';
import { SlideId } from './types';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideId>(SlideId.OPENING);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (id: SlideId) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(id);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 600);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (isTransitioning) return;
    const slides = Object.values(SlideId);
    const currentIndex = slides.indexOf(currentSlide);

    if (e.deltaY > 50 && currentIndex < slides.length - 1) {
      handleNavigate(slides[currentIndex + 1]);
    } else if (e.deltaY < -50 && currentIndex > 0) {
      handleNavigate(slides[currentIndex - 1]);
    }
  }, [currentSlide, isTransitioning]);

  return (
    <div onWheel={handleWheel} className="w-screen h-screen bg-[#fdfbf7] overflow-hidden flex select-none">
      <Navigation currentSlide={currentSlide} onNavigate={handleNavigate} />

      <main className={`flex-1 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isTransitioning ? 'opacity-0 scale-[0.98] translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
        {renderSlide(currentSlide)}
      </main>

      {/* Logo & Info Bar */}
      <div className="fixed top-10 left-10 z-20 flex items-center gap-6 pointer-events-none">
        <div className="flex flex-col gap-1">
          <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="정자유스센터 로고" className="h-10 w-auto object-contain opacity-90" />
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-[#5d4037]/30" />
            <span className="font-display text-[9px] tracking-[0.4em] text-[#5d4037]/50 uppercase">Hajin Choi • 2025 Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderSlide(id: SlideId) {
  switch (id) {
    case SlideId.OPENING:
      return (
        <div className="h-full flex flex-col md:flex-row reveal">
          <div className="flex-1 flex flex-col justify-center px-12 md:px-24 bg-white/50 relative z-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="px-3 py-1 bg-[#1a237e] text-white text-[10px] font-extrabold tracking-[0.2em] uppercase shadow-lg shadow-[#1a237e]/20">Dong-tle 15th</span>
              <div className="w-12 h-[1px] bg-[#5d4037]/20" />
              <span className="text-[#5d4037]/50 text-[10px] tracking-[0.3em] font-bold uppercase">Archive</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-[#5d4037] leading-[1.1] mb-8 font-extrabold">
              문장에서<br />
              <span className="text-[#1a237e] italic font-normal text-4xl md:text-6xl block mt-2">공간으로:</span>
              <span className="text-3xl md:text-4xl font-normal opacity-80 mt-4 block">이야기가 머무는 도서관</span>
            </h1>
            <p className="text-[#5d4037]/70 text-sm md:text-base max-w-md leading-relaxed font-serif italic">
              문예창작 전공의 시선으로 본 도서관의 새로운 가능성.<br />
              텍스트 밖으로 나와 사람과 배움이 만나는 현장을 기록합니다.
            </p>
          </div>
          <div className="flex-1 relative overflow-hidden group">
            <img
              src={import.meta.env.BASE_URL + "assets/summer_camp.jpg"}
              alt="Summer Reading Camp"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#1a237e]/10 mix-blend-multiply opacity-20" />
            <div className="absolute bottom-12 right-12 text-right text-white z-20">
              <p className="text-[10px] tracking-[0.5em] uppercase font-extrabold mb-1 drop-shadow-md">Summer Campaign</p>
              <p className="font-serif italic text-xs drop-shadow-md">"Reading Camp with Children"</p>
            </div>
          </div>
        </div>
      );

    case SlideId.PROFILE:
      return (
        <div className="h-full grid grid-cols-1 md:grid-cols-12 reveal">
          <div className="md:col-span-12 lg:col-span-6 relative overflow-hidden group">
            <img
              src={import.meta.env.BASE_URL + "assets/winter_meeting.jpg"}
              alt="Winter Planning Meeting"
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute top-8 left-8 text-white/80 z-20">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold">In Action</span>
            </div>
          </div>
          <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-center px-12 md:px-24 bg-[#fdfbf7] z-10">
            <div className="mb-12">
              <p className="text-[10px] text-[#1a237e] font-extrabold tracking-[0.5em] uppercase mb-4">The Curator</p>
              <h2 className="font-serif text-4xl md:text-6xl text-[#5d4037] font-bold leading-tight">
                기록하는 마음,<br />
                <span className="text-[#1a237e] italic font-normal">최하진</span>입니다.
              </h2>
            </div>
            <div className="space-y-6 text-[#5d4037]/80 text-base leading-relaxed max-w-md font-serif">
              <p>
                전공에서 배운 '문장'이 실제 공간에서 어떻게 살아 움직이는지 직접 확인하고 싶었습니다. 도서관은 제가 생각했던 것보다 훨씬 더 역동적인 <strong>'배움의 커뮤니티'</strong>였습니다.
              </p>
              <div className="p-8 border-l-[3px] border-[#1a237e] bg-white shadow-xl shadow-[#1a237e]/5 italic">
                <p className="text-base md:text-lg leading-relaxed text-[#5d4037]">
                  "도서관은 단순히 책을 빌리는 곳이 아니라, 지역 공동체의 지성과 감성이 만나는 소중한 플랫폼이라는 것을 1년의 활동을 통해 깊이 깨달았습니다."
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case SlideId.MOTIVATION:
      return (
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 reveal bg-[#1a237e] text-white">
          <div className="lg:col-span-7 relative overflow-hidden">
            <img
              src={import.meta.env.BASE_URL + "assets/writer_meeting.jpg"}
              alt="Beyond Text"
              className="w-full h-full object-cover opacity-60 transition-transform duration-[5000ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e] to-transparent z-10" />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center px-12 md:px-24 relative z-20">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase mb-8 text-white/50">03 Beyond Text</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-8">
              문장에서<br />
              <span className="italic font-normal text-[#fdfbf7]">공간으로 확고히</span>
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-serif italic mb-8">
              캐나다 작가 초청 강연과 같은 글로벌한 문화 행사를 직접 경험하며,<br />
              텍스트 안에 갇혀있던 지식이 사람과 사람 사이의 온기로 변하는 과정을 목도했습니다.
            </p>
            <div className="w-12 h-[1px] bg-white/30" />
          </div>
        </div>
      );

    case SlideId.STRATEGY:
      return (
        <div className="h-full flex flex-col justify-center reveal bg-[#fdfbf7] p-12 md:px-24 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-12 text-center">
              <span className="text-[10px] text-[#1a237e] font-bold tracking-[0.5em] uppercase mb-4 block">04 Action Plan</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#5d4037] mb-4 font-bold tracking-tight">동틀에서의 세 계절</h2>
              <div className="w-16 h-[2px] bg-[#1a237e] mx-auto mb-4" />
              <p className="text-[#5d4037]/60 text-sm font-serif italic">배움의 봄에서 성장의 겨울까지, 도서관 기획자 최하진의 기록</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { season: 'Spring', title: '봄: 기획의 토대', desc: '15기 단원들과의 첫 만남 "동틀의 봄". 도서관의 새로운 가능성을 꿈꾸며 기획의 기초를 다졌습니다.', color: 'border-[#5d4037]/20', img: `${import.meta.env.BASE_URL}assets/summer_prep.jpg` },
                { season: 'Summer', title: '여름: 기획의 실전', desc: '직접 기획한 여름학교 독서캠프. "진짜 vs AI 이미지 구분하기" 등 창의적인 부스를 통해 아이들의 몰입을 이끌어냈습니다.', color: 'border-[#1a237e] bg-[#1a237e]/5 shadow-xl scale-[1.05] z-10', img: `${import.meta.env.BASE_URL}assets/summer_booth.jpg` },
                { season: 'Winter', title: '겨울: 배움의 성과', desc: '동틀의 겨울, 인문학 강연, 정자동 카페거리 기획 등 한 해의 활동을 마무리하며 도서관 기획자로서의 역량을 집약했습니다.', color: 'border-[#5d4037]/20', img: `${import.meta.env.BASE_URL}assets/winter_tree.jpg` }
              ].map((item, idx) => (
                <div key={idx} className={`p-8 border transition-all duration-500 hover:-translate-y-2 ${item.color} relative group overflow-hidden bg-white`}>
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#1a237e] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <span className="font-bold text-[#1a237e]/30 text-[10px] uppercase tracking-[0.4em] mb-4 block group-hover:text-[#1a237e] transition-colors relative z-10">Season 0{idx + 1}</span>
                  <h3 className="font-serif text-xl font-bold mb-4 text-[#5d4037] relative z-10">{item.title}</h3>
                  <p className="text-xs text-[#5d4037]/70 leading-relaxed font-serif relative z-10">
                    {item.desc}
                  </p>
                  <div className="mt-8 transition-all duration-700">
                    <img
                      src={item.img}
                      className="w-full h-28 object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case SlideId.MASTERPIECE:
      return (
        <div className="h-full bg-black text-white flex flex-col justify-center reveal relative overflow-hidden">
          {/* 다이나믹 배경 레이어 */}
          <div className="absolute inset-0 z-0 opacity-20 flex">
            <div className="flex-1 h-full overflow-hidden border-r border-white/5">
              <img src={import.meta.env.BASE_URL + "assets/summer_camp_hall.jpg"} className="w-full h-full object-cover grayscale" alt="" />
            </div>
            <div className="flex-1 h-full overflow-hidden border-r border-white/5 hidden md:block">
              <img src={import.meta.env.BASE_URL + "assets/summer_camp_snacks.jpg"} className="w-full h-full object-cover grayscale" alt="" />
            </div>
            <div className="flex-1 h-full overflow-hidden md:block hidden">
              <img src={import.meta.env.BASE_URL + "assets/summer_camp_stage.jpg"} className="w-full h-full object-cover grayscale" alt="" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e] via-black/40 to-black z-[1]" />

          <div className="max-w-[1400px] mx-auto px-12 md:px-24 relative z-10 w-full flex flex-col items-center">
            <div className="w-full text-center mb-12 space-y-4">
              <span className="text-white/40 font-serif italic text-sm tracking-[0.5em] uppercase block">Video Production Project</span>
              <h2 className="font-serif text-5xl md:text-7xl leading-tight font-bold">
                여름의 조각들, <span className="text-[#1a237e] italic font-normal">영상으로 담다</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/9] w-full bg-black shadow-[0_0_100px_rgba(26,35,126,0.3)] border border-white/10 overflow-hidden group">
                  <video
                    src={import.meta.env.BASE_URL + "assets/video1.mp4"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-black p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-10">
                <p className="text-[#fdfbf7]/80 text-base md:text-lg leading-relaxed font-serif italic">
                  2일간 캠프에서 보여준 아이들의 열정을 한 편의 영상으로 엮어 <br />
                  모두에게 아름다운 마무리로 선물했습니다. <br /><br />
                  <span className="text-white font-bold text-xl block mb-2 underline decoration-[#1a237e] underline-offset-8">"현장의 생동감을 기록으로 증명"</span>
                  촬영부터 편집까지 직접 주도하며 독서캠프의 가치를 시각적으로 전달했습니다.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Equipment</p>
                    <p className="text-xs font-serif">iPhone / Final Cut Pro</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Role</p>
                    <p className="text-xs font-serif">Director & Editor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case SlideId.RESULT:
      return (
        <div className="h-full p-12 md:px-24 flex flex-col justify-center reveal bg-[#fdfbf7] overflow-y-auto">
          <div className="mb-14">
            <h2 className="font-serif text-4xl md:text-5xl text-[#5d4037] mb-4 font-bold tracking-tight">주요 프로젝트 결과물</h2>
            <div className="w-16 h-[2px] bg-[#1a237e] mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. 여름 부스 운영 */}
            <div className="group space-y-4">
              <div className="aspect-[4/5] bg-[#fdfbf7] p-3 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden relative">
                <img src={import.meta.env.BASE_URL + "assets/summer_action.jpg"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Activity" />
                <div className="absolute top-4 left-4 bg-[#1a237e] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter shadow-md">Project 01</div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base text-[#1a237e] font-bold">협력의 부스 운영</h4>
                <p className="text-[11px] text-[#5d4037]/60 font-serif leading-relaxed">디지털 시민성을 주제로 한 부스 '진짜 vs AI'의 전체 동선과 상호작용을 기획하고 운영했습니다.</p>
              </div>
            </div>

            {/* 2. 캔뱃지 디자인 */}
            <div className="group space-y-4">
              <div className="aspect-[4/5] bg-[#fdfbf7] p-3 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden relative">
                <img src={import.meta.env.BASE_URL + "assets/summer_badge.jpg"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Badge" />
                <div className="absolute top-4 left-4 bg-[#1a237e] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter shadow-md">Project 02</div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base text-[#1a237e] font-bold">캔뱃지 디자인 및 제작</h4>
                <p className="text-[11px] text-[#5d4037]/60 font-serif leading-relaxed">캠프의 기억을 간직할 수 있는 캐릭터 굿즈를 디자인했습니다. 아이들에게 가장 인기가 많았던 결과물입니다.</p>
              </div>
            </div>

            {/* 3. 10월 카드뉴스 */}
            <div className="group space-y-4">
              <div className="aspect-[4/5] bg-[#fdfbf7] p-3 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden relative">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={import.meta.env.BASE_URL + "assets/001.png"} className="w-full h-full object-cover" alt="Card News 1" />
                  <img src={import.meta.env.BASE_URL + "assets/002.png"} className="w-full h-full object-cover" alt="Card News 2" />
                  <img src={import.meta.env.BASE_URL + "assets/003.png"} className="w-full h-full object-cover" alt="Card News 3" />
                  <img src={import.meta.env.BASE_URL + "assets/004.png"} className="w-full h-full object-cover" alt="Card News 4" />
                </div>
                <div className="absolute top-4 left-4 bg-[#1a237e] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter shadow-md">Project 03</div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                  <p className="text-white text-[10px] font-bold italic border-y border-white/30 py-4">"10월: 바다의 서사를 큐레이션하다"</p>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base text-[#1a237e] font-bold">10월 카드뉴스 기획 및 편집</h4>
                <p className="text-[11px] text-[#5d4037]/60 font-serif leading-relaxed">바다 테마의 북 큐레이션 카드뉴스를 제작하여, 도서관의 콘텐츠를 전 세대가 공감할 수 있는 시각 언어로 풀어냈습니다.</p>
              </div>
            </div>

            {/* 4. 동틀의 겨울 */}
            <div className="group space-y-4">
              <div className="aspect-[4/5] bg-[#fdfbf7] p-3 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden relative">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={import.meta.env.BASE_URL + "assets/winter_card.jpg"} className="w-full h-full object-cover" alt="Winter Card" />
                  <img src={import.meta.env.BASE_URL + "assets/winter_tree.jpg"} className="w-full h-full object-cover" alt="Winter Tree" />
                  <img src={import.meta.env.BASE_URL + "assets/winter_children.jpg"} className="w-full h-full object-cover" alt="Winter Children" />
                  <img src={import.meta.env.BASE_URL + "assets/winter_decoration.jpg"} className="w-full h-full object-cover" alt="Winter Decoration" />
                </div>
                <div className="absolute top-4 left-4 bg-[#1a237e] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter shadow-md">Project 04</div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                  <p className="text-white text-[10px] font-bold italic border-y border-white/30 py-4">"동틀의 겨울: 함께 만든 공간"</p>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base text-[#1a237e] font-bold">동틀의 겨울</h4>
                <p className="text-[11px] text-[#5d4037]/60 font-serif leading-relaxed">스탬프 투어 카드부터 소망 트리까지, 겨울 도서관의 활기를 더하는 공간 기획에 참여했습니다.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 border-t border-[#1a237e]/10 flex items-center justify-between opacity-80">
            <div className="flex gap-4">
              {['Planning', 'Identity Design', 'Content Curation', 'Social Media'].map(tag => (
                <span key={tag} className="text-[9px] font-bold text-[#1a237e] border border-[#1a237e]/20 px-3 py-1 rounded-full uppercase tracking-tighter">{tag}</span>
              ))}
            </div>
            <p className="text-[10px] text-[#5d4037]/50 font-extrabold tracking-[0.2em]">DONG-TLE 15TH PERFORMANCE</p>
          </div>
        </div>
      );

    case SlideId.VISION:
      return (
        <div className="h-full flex flex-col items-center justify-start reveal relative px-12 bg-[#fdfbf7] pt-28 overflow-y-auto">
          {/* Decorative Instagram Style Card News Element */}
          <div className="absolute top-32 right-12 w-64 h-80 bg-white shadow-2xl rounded-2xl p-6 rotate-6 hidden xl:block border border-[#1a237e]/10 group hover:rotate-0 transition-transform duration-700">
            <div className="w-full h-48 bg-[#fdfbf7] rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
              <img src={import.meta.env.BASE_URL + "assets/006.png"} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Card News Detail" />
              <div className="absolute inset-0 bg-[#1a237e]/10 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10 px-4 bg-white/80 backdrop-blur-sm py-2 rounded shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                  <p className="text-[8px] text-[#1a237e] font-bold tracking-widest uppercase mb-0.5">Focus</p>
                  <h5 className="font-serif text-sm text-[#5d4037] font-bold italic">바다 테마 큐레이션</h5>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#5d4037]/60 leading-relaxed font-serif">
              "전 세대를 아우르는 친근한 디자인과 바다 테마의 큐레이션으로 높은 호응을 얻었습니다."
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-[8px] font-bold text-[#1a237e]/40">@dongteul.lib</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1a237e]/10" />)}
              </div>
            </div>
          </div>

          <div className="relative text-center max-w-5xl w-full">
            <h2 className="font-serif text-5xl md:text-7xl text-[#5d4037] mb-8 leading-tight font-bold tracking-tighter">
              도서관을 넘어,<br />
              <span className="text-[#1a237e] italic font-normal">더 넓은 세상의 서사를</span><br />
              씁니다.
            </h2>

            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <p className="text-base md:text-xl text-[#5d4037]/70 font-serif italic mb-12 leading-relaxed max-w-lg">
                전공의 깊이와 도서관에서의 실전 기획력을 결합하여<br />
                사람들에게 울림을 주는 콘텐츠 에디터로 성장하겠습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full mb-16">
                {/* Profile Polaroid */}
                <div className="relative group mx-auto">
                  <div className="relative w-56 h-72 rotate-[-3deg] group-hover:rotate-0 transition-all duration-1000 border-8 border-white shadow-2xl overflow-hidden bg-white">
                    <img src={import.meta.env.BASE_URL + "assets/summer_polaroid.jpg"} className="w-full h-full object-cover" alt="Team Polaroid" />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="font-serif italic text-[#1a237e] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">#동틀의_추억</p>
                    </div>
                  </div>
                </div>

                {/* Curation Photo */}
                <div className="relative group mx-auto">
                  <div className="relative w-56 h-72 rotate-[3deg] group-hover:rotate-0 transition-all duration-1000 border-8 border-white shadow-2xl overflow-hidden bg-white">
                    <img src={import.meta.env.BASE_URL + "assets/001.png"} className="w-full h-full object-cover" alt="Book Curation" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#1a237e] text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10 shadow-lg">Curation Artist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default App;
