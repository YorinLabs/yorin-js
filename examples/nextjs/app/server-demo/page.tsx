'use client';

import { useState } from 'react';

interface TrackingResponse {
  success?: boolean;
  message?: string;
  type?: string;
  eventName?: string;
  userId?: string;
  groupId?: string;
  error?: string;
  details?: string;
}

export default function ServerDemo() {
  const [userId, setUserId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  const [groupId, setGroupId] = useState('org_acme_corp');
  const [response, setResponse] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const trackServerEvent = async (
    type: string,
    eventName?: string,
    properties?: Record<string, unknown>,
    paymentProperties?: Record<string, unknown>,
    subscriptionProperties?: Record<string, unknown>,
    customGroupId?: string,
    options?: Record<string, unknown>
  ) => {
    setLoading(true);
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          eventName,
          userId,
          groupId: customGroupId || groupId,
          properties,
          paymentProperties,
          subscriptionProperties,
          options: {
            anonymousUserId: 'anon_' + Math.random().toString(36).substr(2, 9),
            sessionId: 'session_' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            ...options,
          },
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Network error', details: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Yorin Node.js SDK v2.0 - Server Demo
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID (for server events)
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter user ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group ID (for group operations)
              </label>
              <input
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter group ID"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Contact Management */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Contact Management</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => trackServerEvent('addOrUpdateContact', undefined, {
                      $email: 'john.doe@acme.com',
                      $full_name: 'John Doe',
                      $first_name: 'John',
                      $last_name: 'Doe',
                      $company: 'Acme Corp',
                      $job_title: 'Software Engineer',
                      $phone: '+1-555-0123',
                      department: 'Engineering',
                      level: 'senior',
                      start_date: '2023-01-15'
                    })}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    ➕ Add/Update Contact
                  </button>

                  <button
                    onClick={() => trackServerEvent('addOrUpdateContact', undefined, {
                      $email: 'sarah.manager@acme.com',
                      $full_name: 'Sarah Johnson',
                      $company: 'Acme Corp',
                      $job_title: 'Engineering Manager',
                      team: 'Backend',
                      reports: 8,
                      location: 'San Francisco'
                    })}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    👩‍💼 Add Manager Contact
                  </button>

                  <button
                    onClick={() => trackServerEvent('deleteContact')}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    🗑️ Delete Contact
                  </button>
                </div>
              </div>

              {/* Group Management */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-900 mb-4">Group Management</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => trackServerEvent('addOrUpdateGroup', undefined, {
                      $name: 'Acme Corporation',
                      $description: 'Leading SaaS company',
                      $industry: 'Technology',
                      $size: '500',
                      $website: 'https://acme.com',
                      $email: 'info@acme.com',
                      $phone: '+1-800-ACME-123',
                      plan_type: 'enterprise',
                      annual_revenue: 50000000,
                      founded_year: 2015
                    })}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    🏢 Add/Update Group
                  </button>

                  <button
                    onClick={() => trackServerEvent('addOrUpdateGroup', undefined, {
                      $name: 'Engineering Team',
                      $description: 'Product development team',
                      team_size: 25,
                      budget: 2500000,
                      location: 'San Francisco HQ'
                    }, undefined, undefined, 'team_engineering')}
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
                  >
                    👥 Add Engineering Team
                  </button>

                  <button
                    onClick={() => trackServerEvent('deleteGroup')}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    🗑️ Delete Group
                  </button>
                </div>
              </div>

              {/* Payment Events */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">Payment Events</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => trackServerEvent('payment', undefined, undefined, {
                      payment_id: 'pay_' + Math.random().toString(36).substr(2, 9),
                      amount: 29.99,
                      currency: 'USD',
                      payment_method: 'credit_card',
                      payment_status: 'completed',
                      product_id: 'prod_premium_monthly',
                      subscription_id: 'sub_' + Math.random().toString(36).substr(2, 9)
                    })}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
                  >
                    💳 Monthly Payment
                  </button>

                  <button
                    onClick={() => trackServerEvent('payment', undefined, undefined, {
                      payment_id: 'pay_stripe_' + Math.random().toString(36).substr(2, 9),
                      amount: 299.99,
                      currency: 'USD',
                      payment_method: 'stripe',
                      payment_status: 'completed',
                      stripe_session_id: 'cs_test_' + Math.random().toString(36).substr(2, 15),
                      product_id: 'prod_enterprise_annual',
                      invoice_id: 'inv_' + Math.random().toString(36).substr(2, 9)
                    })}
                    disabled={loading}
                    className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 disabled:opacity-50"
                  >
                    🏆 Enterprise Payment
                  </button>

                  <button
                    onClick={() => trackServerEvent('payment', undefined, undefined, {
                      payment_id: 'pay_failed_' + Math.random().toString(36).substr(2, 9),
                      amount: 19.99,
                      currency: 'USD',
                      payment_method: 'credit_card',
                      payment_status: 'failed',
                      product_id: 'prod_basic_monthly',
                      failure_reason: 'insufficient_funds'
                    })}
                    disabled={loading}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:opacity-50"
                  >
                    ❌ Failed Payment
                  </button>
                </div>
              </div>

              {/* Subscription Management */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">Subscription Management</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => trackServerEvent('subscription', undefined, undefined, undefined, {
                      external_subscription_id: 'sub_contact_' + Math.random().toString(36).substr(2, 9),
                      plan_id: 'plan_premium_monthly',
                      plan_name: 'Premium Monthly',
                      status: 'active',
                      subscriber_type: 'contact',
                      amount: 29.99,
                      currency: 'USD',
                      billing_cycle: 'monthly',
                      started_at: new Date().toISOString(),
                      current_period_start: new Date().toISOString(),
                      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                      provider: 'stripe'
                    })}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    👤 Contact Subscription
                  </button>

                  <button
                    onClick={() => trackServerEvent('subscription', undefined, undefined, undefined, {
                      external_subscription_id: 'sub_group_' + Math.random().toString(36).substr(2, 9),
                      plan_id: 'plan_enterprise_annual',
                      plan_name: 'Enterprise Annual',
                      status: 'active',
                      subscriber_type: 'group',
                      subscriber_id: groupId,
                      amount: 2999.99,
                      currency: 'USD',
                      billing_cycle: 'yearly',
                      started_at: new Date().toISOString(),
                      provider: 'stripe',
                      seats: 50
                    })}
                    disabled={loading}
                    className="w-full bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800 disabled:opacity-50"
                  >
                    🏢 Group Subscription
                  </button>

                  <button
                    onClick={() => trackServerEvent('subscription', undefined, undefined, undefined, {
                      external_subscription_id: 'sub_trial_' + Math.random().toString(36).substr(2, 9),
                      plan_id: 'plan_pro_trial',
                      plan_name: 'Pro Trial',
                      status: 'trialing',
                      subscriber_type: 'contact',
                      amount: 0,
                      currency: 'USD',
                      billing_cycle: 'monthly',
                      started_at: new Date().toISOString(),
                      trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                      provider: 'stripe'
                    })}
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50"
                  >
                    🆓 Trial Subscription
                  </button>
                </div>
              </div>

              {/* Custom Events */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-orange-900 mb-4">Custom Events</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => trackServerEvent('track', 'feature_used', {
                      feature_name: 'advanced_analytics',
                      usage_count: 1,
                      feature_tier: 'premium'
                    })}
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50"
                  >
                    📊 Track Feature Usage
                  </button>

                  <button
                    onClick={() => trackServerEvent('track', 'user_login', {
                      login_method: 'oauth',
                      provider: 'google',
                      device_type: 'desktop'
                    })}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
                  >
                    🔐 Track Login
                  </button>

                  <button
                    onClick={() => trackServerEvent('page', 'Server Demo Page', {
                      section: 'demo',
                      page_type: 'example',
                      referrer: 'direct'
                    })}
                    disabled={loading}
                    className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 disabled:opacity-50"
                  >
                    📄 Track Page View
                  </button>
                </div>
              </div>
            </div>

            {/* Response Panel */}
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">API Response</h2>
                <div className="bg-white border rounded-md p-4 min-h-96 max-h-96 overflow-auto">
                  {loading && (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3 text-gray-600">Sending event...</span>
                    </div>
                  )}
                  {response && !loading && (
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  )}
                  {!response && !loading && (
                    <div className="flex items-center justify-center h-32">
                      <p className="text-gray-500 italic">Click any button to see the server response</p>
                    </div>
                  )}
                </div>
              </div>

              {/* API Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">New API Architecture v2.0</h3>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li>• <strong>addOrUpdateContact</strong> - Replaces deprecated identify</li>
                  <li>• <strong>addOrUpdateGroup</strong> - Replaces deprecated group</li>
                  <li>• <strong>deleteContact/deleteGroup</strong> - NEW delete operations</li>
                  <li>• <strong>Enhanced options</strong> - anonymousUserId, sessionId, timestamps</li>
                  <li>• <strong>Type-safe</strong> - Full TypeScript support</li>
                  <li>• <strong>Modular SDK</strong> - Clean separation of concerns</li>
                </ul>
              </div>

              {/* Server Events Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Server Events (Secret Key)</h3>
                <ul className="text-green-800 text-sm space-y-2">
                  <li>• <strong>Full CRUD</strong> - Create, read, update, delete operations</li>
                  <li>• <strong>PostgreSQL writes</strong> - Contact and group management</li>
                  <li>• <strong>ClickHouse analytics</strong> - All events stored for analytics</li>
                  <li>• <strong>No domain validation</strong> - Backend services bypass CORS</li>
                  <li>• <strong>Anonymous mapping</strong> - Links sessions to identified users</li>
                </ul>
              </div>

              {/* Database Schema Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Database Integration</h3>
                <ul className="text-purple-800 text-sm space-y-2">
                  <li>• <strong>contacts</strong> - User profiles with external_id unique constraint</li>
                  <li>• <strong>contact_groups</strong> - Organization data with external_id</li>
                  <li>• <strong>contact_group_memberships</strong> - Many-to-many relationships</li>
                  <li>• <strong>subscriptions</strong> - Polymorphic subscriber (contact/group)</li>
                  <li>• <strong>anonymous_user_mappings</strong> - Session linking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}