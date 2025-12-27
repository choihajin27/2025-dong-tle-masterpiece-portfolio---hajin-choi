
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
          <img src="/assets/logo.png" alt="정자유스센터 로고" className="h-10 w-auto object-contain opacity-90" />
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
              src="/assets/summer_camp.jpg"
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
          <div className="md:col-span-5 relative overflow-hidden group">
            <img
              src="/assets/winter_meeting.jpg"
              alt="Winter Planning Meeting"
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute top-8 left-8 text-white/80 z-20">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold">In Action</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/40 to-transparent opacity-60" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center px-12 md:px-24 py-12 bg-white">
            <div className="max-w-2xl space-y-8">
              <div className="space-y-2">
                <span className="text-[#1a237e] font-bold tracking-[0.4em] text-[10px] uppercase opacity-60">The Visionary</span>
                <h2 className="font-serif text-4xl md:text-6xl text-[#5d4037] leading-tight font-bold">
                  문장의 힘을 믿는,<br />
                  <span className="text-[#1a237e] italic font-normal">도서관 기획자</span>
                </h2>
              </div>

              <div className="space-y-6 text-[#5d4037]/90 text-base md:text-lg leading-relaxed font-serif">
                <p>
                  책 속의 문장들에 매료되어 문예창작을 전공했지만, 텍스트 안에만 갇혀 있고 싶지는 않았습니다. 책이 세상으로 나와 사람들과 어떻게 호흡하는지 궁금해 동틀에 지원하게 되었습니다.
                </p>
                <p className="opacity-70 text-sm md:text-base border-l-2 border-[#1a237e]/20 pl-6 italic">
                  1년간의 활동을 통해 도서관은 단순한 독서실이 아닌, 전 세대가 어우러지는 <strong>'역동적인 커뮤니티 공간'</strong>임을 체감했습니다. 직접 기획하고 실행하며 느꼈던 뿌듯함은 저에게 새로운 원동력이 되었습니다.
                </p>
              </div>

              <div className="pt-10 grid grid-cols-3 gap-8 border-t border-[#5d4037]/10">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#1a237e] uppercase tracking-[0.2em] opacity-50">Department</h4>
                  <p className="font-serif text-sm font-bold opacity-80">문예창작학과</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#1a237e] uppercase tracking-[0.2em] opacity-50">Division</h4>
                  <p className="font-serif text-sm font-bold opacity-80">홍보 & 기획팀</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#1a237e] uppercase tracking-[0.2em] opacity-50">Strength</h4>
                  <p className="font-serif text-sm font-bold opacity-80">브랜딩 / 스토리텔링</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case SlideId.MOTIVATION:
      return (
        <div className="h-full grid grid-cols-1 md:grid-cols-2 reveal overflow-hidden">
          <div className="flex flex-col justify-center px-12 md:px-24 space-y-10 relative z-10 bg-[#fdfbf7]/80 backdrop-blur-sm">
            <div>
              <span className="font-serif text-[#1a237e] text-xs font-bold mb-3 block tracking-[0.4em] uppercase opacity-60 underline underline-offset-8">03 Beyond Text</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#5d4037] leading-[1.2] font-bold">
                텍스트를 넘어,<br />
                <span className="text-[#1a237e] italic font-normal">현장으로 나아간 이유</span>
              </h2>
            </div>
            <div className="space-y-6 text-[#5d4037]/80 text-base leading-relaxed max-w-md font-serif">
              <p>
                전공에서 배운 '문장'이 실제 공간에서 어떻게 살아 움직이는지 직접 확인하고 싶었습니다. 도서관은 제가 생각했던 것보다 훨씬 더 역동적인 <strong>'배움의 커뮤니티'</strong>였습니다.
              </p>
              <div className="p-8 border-l-[3px] border-[#1a237e] bg-white shadow-xl shadow-[#1a237e]/5 italic">
                <p className="text-base md:text-lg leading-relaxed text-[#5d4037]">
                  "캐나다 작가와의 만남 등 글로벌한 문화 행사를 보며 깨달았습니다. 도서관은 단순히 책을 빌리는 곳이 아니라, 전 세계의 지성과 로컬의 마음이 만나는 플랫폼이라는 것을요."
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              src="/assets/writer_meeting.jpg"
              alt="Meeting with Canadian Writer"
              className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#5d4037]/10 mix-blend-multiply opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] border border-white/30 backdrop-blur-[1px]" />
            </div>
          </div>
        </div>
      );

    case SlideId.STRATEGY:
      return (
        <div className="h-full p-12 md:px-24 flex flex-col justify-center reveal bg-[#fdfbf7]">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-[#5d4037] mb-4 font-bold tracking-tight">동틀에서의 세 계절</h2>
            <div className="w-16 h-[2px] bg-[#1a237e] mx-auto mb-4" />
            <p className="text-[#5d4037]/60 text-sm md:text-base font-serif italic tracking-wide">배움의 봄에서 성장의 겨울까지, 하진의 기록</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { season: 'Spring', title: '봄: 시작의 설렘', desc: '15기 단원들과의 첫 만남 "동틀의 봄". 도서관의 새로운 가능성을 꿈꾸며 기획의 기초를 다졌습니다.', color: 'border-[#5d4037]/20', img: '/assets/summer_camp.jpg' },
              { season: 'Summer', title: '여름: 기획의 실전', desc: '내가 담당한 "진짜 vs AI 이미지 구분하기" 부스. 아이들의 열광적인 반응을 이끌어낸 기획의 힘을 느꼈습니다.', color: 'border-[#1a237e] bg-[#1a237e]/5 scale-105 shadow-2xl z-10', img: '/assets/summer_booth.jpg' },
              { season: 'Winter', title: '겨울: 기획의 마무리', desc: '1년의 긴 여정을 마무리하는 겨울. "동틀의 겨울" 행사를 주도하며 기획의 완성도를 높이고 유종의 미를 거두었습니다.', color: 'border-[#5d4037]/20', img: '/assets/winter_ornament.jpg' }
            ].map((item, idx) => (
              <div key={idx} className={`p-8 border transition-all duration-500 hover:-translate-y-2 ${item.color} relative group overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={item.img} className="w-full h-full object-cover" alt="" />
                </div>
                <span className="font-bold text-[#1a237e]/30 text-[10px] uppercase tracking-[0.4em] mb-4 block group-hover:text-[#1a237e] transition-colors relative z-10">Season 0{idx + 1} • {item.season}</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 text-[#5d4037] relative z-10">{item.title}</h3>
                <p className="text-sm text-[#5d4037]/70 leading-relaxed font-serif relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-white border border-[#1a237e]/10 shadow-lg flex items-center justify-between max-w-4xl mx-auto w-full">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
              </div>
              <p className="text-sm md:text-base font-serif italic text-[#5d4037]/80 leading-relaxed">
                "성남청소년청년재단 정자유스센터에서의 1년, <br />단순한 서포터를 넘어 주도적인 기획자로 거듭났습니다."
              </p>
            </div>
          </div>
        </div>
      );

    case SlideId.MASTERPIECE:
      return (
        <div className="h-full bg-black text-white flex flex-col justify-center reveal relative overflow-hidden">
          {/* 다이나믹 배경 레이어 */}
          <div className="absolute inset-0 z-0 opacity-40 flex">
            <div className="flex-1 h-full overflow-hidden border-r border-white/10">
              <img src="/assets/summer_camp_hall.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
            </div>
            <div className="flex-1 h-full overflow-hidden border-r border-white/10 hidden md:block">
              <img src="/assets/summer_camp_snacks.jpg" className="w-full h-full object-cover grayscale" alt="" />
            </div>
            <div className="flex-1 h-full overflow-hidden md:block hidden">
              <img src="/assets/summer_camp_stage.jpg" className="w-full h-full object-cover grayscale" alt="" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e] via-[#1a237e]/40 to-black/80 z-[1]" />

          <div className="max-w-7xl mx-auto px-12 md:px-24 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="text-white/40 font-serif italic text-sm tracking-[0.5em] uppercase">Digital Archive Project</span>
                  <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] font-bold">
                    기록의 힘, <br />
                    <span className="text-white/50 italic font-normal">여름의 조각들</span>
                  </h2>
                </div>

                <p className="text-[#fdfbf7]/80 text-base md:text-lg leading-relaxed font-serif italic max-w-md">
                  여름학교 독서캠프의 현장감을 담기 위해 전 과정을 기록했습니다. <strong>영상 촬영부터 편집까지 직접 주도</strong>하며, 긴 대기 시간을 아이들의 환호로 바꾸는 아카이빙의 힘을 실천했습니다.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/5 backdrop-blur-md p-4 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Stage</p>
                    <p className="font-serif text-sm">연합 독서 프로젝트</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-4 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Role</p>
                    <p className="font-serif text-sm">기획 및 총괄 편집</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-[16/9] w-full bg-black shadow-[0_0_100px_rgba(0,0,0,0.8)] border-4 border-white/10 overflow-hidden group">
                  <video
                    src="/assets/video1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1a237e]/20 to-transparent mix-blend-overlay" />
                  <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/80">Archived 2025.07</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case SlideId.RESULT:
      return (
        <div className="h-full p-12 md:px-24 flex flex-col justify-center reveal bg-white">
          <div className="mb-14 border-b border-[#5d4037]/10 pb-8 flex justify-between items-end">
            <div>
              <h2 className="font-serif text-4xl text-[#5d4037] mb-3 font-bold underline decoration-[#1a237e]/20 underline-offset-8">동틀의 여름: 실질적 성과</h2>
              <p className="text-sm text-[#5d4037]/50 font-serif tracking-[0.2em] italic uppercase">Digital Citizenship Archives</p>
            </div>
            <div className="text-[10px] font-bold text-[#1a237e] tracking-[0.3em] uppercase">2025 Summer Collection</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group space-y-6">
              <div className="aspect-[4/3] bg-[#fdfbf7] p-4 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden relative">
                <img src="/assets/summer_action.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Activity" />
                <div className="absolute inset-0 bg-[#1a237e]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2 text-center">
                <h4 className="font-serif text-lg text-[#1a237e] font-bold">1. 협력의 부스 운영</h4>
                <p className="text-xs text-[#5d4037]/60 font-serif leading-relaxed px-4">아이들이 디지털 시민성을 재미있게 배울 수 있도록 부스 전체 동선과 상호작용을 기획했습니다.</p>
              </div>
            </div>

            <div className="group space-y-6">
              <div className="aspect-[4/3] bg-[#fdfbf7] p-4 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden relative">
                <img src="/assets/summer_cert.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Certificate" />
                <div className="absolute inset-0 bg-[#1a237e]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2 text-center">
                <h4 className="font-serif text-lg text-[#1a237e] font-bold">2. 디자인: 수료증 제작</h4>
                <p className="text-xs text-[#5d4037]/60 font-serif leading-relaxed px-4">아이들의 성취감을 극대화하기 위해 직접 디자인하고 제작한 "동틀의 여름" 우수 수료증입니다.</p>
              </div>
            </div>

            <div className="group space-y-6">
              <div className="aspect-[4/3] bg-[#fdfbf7] p-4 border border-[#5d4037]/10 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden relative">
                <img src="/assets/summer_badge.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Badge" />
                <div className="absolute inset-0 bg-[#1a237e]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-2 text-center">
                <h4 className="font-serif text-lg text-[#1a237e] font-bold">3. 굿즈: 캔뱃지 디자인</h4>
                <p className="text-xs text-[#5d4037]/60 font-serif leading-relaxed px-4">활동의 기억을 간직할 수 있도록 직접 제작한 캔뱃지입니다. 캐릭터 선정부터 레이아웃까지 전 과정을 주도했습니다.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 border-t border-[#1a237e]/10 flex items-center justify-between opacity-80">
            <div className="flex gap-4">
              <span className="text-[10px] font-bold text-[#1a237e] border border-[#1a237e]/30 px-3 py-1 rounded-full uppercase">Planning</span>
              <span className="text-[10px] font-bold text-[#1a237e] border border-[#1a237e]/30 px-3 py-1 rounded-full uppercase">Design</span>
              <span className="text-[10px] font-bold text-[#1a237e] border border-[#1a237e]/30 px-3 py-1 rounded-full uppercase">Execution</span>
            </div>
            <p className="text-[10px] text-[#5d4037]/50 font-extrabold tracking-[0.2em]">DONG-TLE SUMMER 2025</p>
          </div>
        </div>
      );

    case SlideId.VISION:
      return (
        <div className="h-full flex flex-col items-center justify-start reveal relative px-12 bg-[#fdfbf7] pt-28 overflow-y-auto">
          {/* Decorative Instagram Style Card News Element */}
          <div className="absolute top-32 right-12 w-64 h-80 bg-white shadow-2xl rounded-2xl p-6 rotate-6 hidden xl:block border border-[#1a237e]/10 group hover:rotate-0 transition-transform duration-700">
            <div className="w-full h-48 bg-[#fdfbf7] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[#009688]/10 opacity-40" /> {/* Aqua theme overlay */}
              <div className="text-center z-10 px-4">
                <p className="text-[10px] text-[#009688] font-bold tracking-widest uppercase mb-1">Recommended</p>
                <h5 className="font-serif text-lg text-[#1a237e] font-bold">10월 카드뉴스: 바다</h5>
                <div className="w-8 h-[2px] bg-[#009688] mx-auto mt-2" />
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
                    <img src="/assets/summer_polaroid.jpg" className="w-full h-full object-cover" alt="Team Polaroid" />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="font-serif italic text-[#1a237e] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">#동틀의_추억</p>
                    </div>
                  </div>
                </div>

                {/* Curation Photo */}
                <div className="relative group mx-auto">
                  <div className="relative w-56 h-72 rotate-[3deg] group-hover:rotate-0 transition-all duration-1000 border-8 border-white shadow-2xl overflow-hidden bg-white">
                    <img src="/assets/book_curation.jpg" className="w-full h-full object-cover" alt="Book Curation" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-[#1a237e] text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter z-10 shadow-lg">Curation Artist</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 relative group pb-12">
                <div className="w-20 h-20 border-2 border-[#1a237e] rotate-45 flex items-center justify-center group-hover:bg-[#1a237e] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                  <span className="font-serif text-3xl font-bold -rotate-45 text-[#1a237e] group-hover:text-white transition-colors duration-500">최</span>
                  <div className="absolute inset-x-0 bottom-0 h-[0%] bg-white/20 group-hover:h-[100%] transition-all duration-1000" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-[#5d4037] mb-2 tracking-[0.5em]">최 하 진</h3>
                  <p className="font-sans text-[10px] tracking-[0.6em] text-[#1a237e] uppercase font-extrabold opacity-70">Librarian Supporter • Editor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 w-full px-24 flex justify-between items-center text-[9px] font-extrabold tracking-[0.4em] text-[#5d4037]/40 uppercase">
            <span className="hover:text-[#1a237e] transition-colors cursor-none">Instagram @dongteul.lib</span>
            <div className="flex gap-10 items-center">
              <span>Dong-tle Archive</span>
              <div className="w-[1px] h-4 bg-[#5d4037]/20" />
              <span>2025 Masterpiece</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default App;
