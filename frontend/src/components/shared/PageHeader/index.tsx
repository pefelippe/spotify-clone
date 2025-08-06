interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white-text mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-400 text-lg mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default PageHeader; 