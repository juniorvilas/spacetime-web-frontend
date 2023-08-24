export function EmptyMemories() {
    return (
      <div className="flex flex-1 items-center justify-center p-5  lg:p-16">
        <p className="text-sm lg:text-lg text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança, começa{' '}
          <a  href="/memories/new" className="underline hover:text-gray-50">
            criar agora
          </a>
          !
        </p>
      </div>
    )
  }