import clsx from 'clsx';
import * as React from 'react';
import {
  SiAwslambda,
  SiAmazonapigateway,
  SiAmazonec2,
  SiAmazons3,
  SiDocker,
  SiGit,
  SiElasticsearch
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';

import translations from '@/constants/translations/techStack';

export default function TechStackInfra({ isSpanish }: { isSpanish: boolean }) {
  const t = isSpanish ? translations.es : translations.en;

  const stacks = [
    {
      id: 'docker',
      icon: SiDocker,
      tooltip: (
        <>
          <CustomLink href='https://www.docker.com/'>Docker</CustomLink>, {t.dockerDesc}
        </>
      ),
      tech_type: 'cloud',
    },
    {
      id: 'aws_lambda',
      icon: SiAwslambda,
      tooltip: (
        <>
          <CustomLink href='https://aws.amazon.com/lambda/'>AWS Lambda</CustomLink>, {t.lambdaDesc}
        </>
      ),
      tech_type: 'cloud',
      
    },
    {
      id: 'aws_s3',
      icon: SiAmazons3,
      tooltip: (
        <>
          <CustomLink href='https://aws.amazon.com/s3/'>AWS S3</CustomLink>, {t.s3Desc}
        </>
      ),
      tech_type: 'cloud',
    },
    {
      id: 'aws_ec2',
      icon: SiAmazonec2,
      tooltip: (
        <>
          <CustomLink href='https://aws.amazon.com/ec2/'>AWS EC2</CustomLink>, {t.ec2Desc}
        </>
      ),
      tech_type: 'cloud',
    },
    {
      id: 'aws_api_gateway',
      icon: SiAmazonapigateway,
      tooltip: (
        <>
          <CustomLink href='https://aws.amazon.com/api-gateway/'>AWS API Gateway</CustomLink>, {t.apiGatewayDesc}
        </>
      ),
      tech_type: 'cloud',
    },
    {
      id: 'git',
      icon: SiGit,
      tooltip: (
        <>
          <CustomLink href='https://git-scm.com/'>Git</CustomLink>/<CustomLink href='https://github.com/'>GitHub</CustomLink>, {t.gitDesc}
        </>
      ),
      tech_type: 'cloud',
    },
    {
      id: 'elastic_search',
      icon: SiElasticsearch,
      tooltip: (
        <>
          <CustomLink href='https://www.elastic.co/elasticsearch/'>Elasticsearch</CustomLink>, {t.elasticDesc}
        </>
      ),
      tech_type: 'ai',
    }
  ];
  return (
    <div className='flex space-x-2 md:space-x-4'>
      {stacks.map((tech) => (
        <Tooltip key={tech.id} tipChildren={<p>{tech.tooltip}</p>}>
          <tech.icon
            key={tech.id}
            className={clsx(
              'h-8 w-8 md:h-10 md:w-10',
              'text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300',
              'transition-colors'
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
}
