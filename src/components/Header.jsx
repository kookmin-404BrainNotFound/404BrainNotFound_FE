export default function Header({
  title = "",
  left = null, // 왼쪽 요소 (뒤로가기 버튼, 아이콘 등)
  right = null, // 오른쪽 요소 (설정, 저장 버튼 등)
}) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70">
      <div className="px-5 py-4 flex items-center justify-between">
        {/* 왼쪽 */}
        <div>{left}</div>

        {/* 중앙 제목 */}
        <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">
          {title}
        </h1>

        {/* 오른쪽 */}
        <div>{right}</div>
      </div>
    </header>
  );
}
