interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}
