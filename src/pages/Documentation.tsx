import React from 'react';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Book, Video, Download, ExternalLink, Search } from 'lucide-react';

const Documentation: React.FC = () => {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of AquaMind water monitoring',
      items: [
        { name: 'Quick Start Guide', type: 'PDF', size: '2.3 MB' },
        { name: 'System Setup', type: 'Video', duration: '15 min' },
        { name: 'First Login Tutorial', type: 'HTML', pages: '8 pages' }
      ]
    },
    {
      title: 'User Manual',
      description: 'Comprehensive guide to all features',
      items: [
        { name: 'Complete User Manual', type: 'PDF', size: '12.5 MB' },
        { name: 'Dashboard Overview', type: 'HTML', pages: '4 pages' },
        { name: 'Reports Generation', type: 'PDF', size: '3.2 MB' }
      ]
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      items: [
        { name: 'API Reference', type: 'HTML', pages: '45 pages' },
        { name: 'Integration Examples', type: 'PDF', size: '5.1 MB' },
        { name: 'SDK Documentation', type: 'HTML', pages: '23 pages' }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Setting Up Your First Tank',
      duration: '8 min',
      difficulty: 'Beginner',
      description: 'Learn how to add and configure your first water tank in AquaMind'
    },
    {
      title: 'Understanding Water Analytics',
      duration: '12 min',
      difficulty: 'Intermediate',
      description: 'Deep dive into usage analytics and trend interpretation'
    },
    {
      title: 'Community Management',
      duration: '15 min',
      difficulty: 'Advanced',
      description: 'Managing multiple tanks and community water systems'
    },
    {
      title: 'AI Alerts Configuration',
      duration: '10 min',
      difficulty: 'Intermediate',
      description: 'Configure intelligent alerts for predictive maintenance'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-600" />;
      case 'Video': return <Video className="h-4 w-4 text-blue-600" />;
      case 'HTML': return <Book className="h-4 w-4 text-green-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold aqua-gradient bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-muted-foreground">
              Guides, tutorials, and reference materials for AquaMind
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search Docs</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download All</span>
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Guides</CardTitle>
              <Book className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Available guides
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
              <Video className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Tutorial videos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Docs</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                API references
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Total downloads
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.size || item.duration || item.pages}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
            <CardDescription>
              Step-by-step video guides to help you master AquaMind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Duration: {tutorial.duration}
                      </span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions and answers about AquaMind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  question: 'How do I add a new water tank to my account?',
                  answer: 'Navigate to the Dashboard and click the "Add Tank" button. Follow the setup wizard to configure your tank.'
                },
                {
                  question: 'What should I do if I receive a low water alert?',
                  answer: 'Check your tank level immediately and schedule a refill. You can also adjust alert thresholds in Settings.'
                },
                {
                  question: 'How accurate are the AI predictions?',
                  answer: 'Our AI predictions are typically 95% accurate based on historical usage patterns and current consumption rates.'
                },
                {
                  question: 'Can I export my water usage data?',
                  answer: 'Yes, you can export data in CSV or PDF format from the Reports page. Historical data is available for up to 2 years.'
                }
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Documentation;